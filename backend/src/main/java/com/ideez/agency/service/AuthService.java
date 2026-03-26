package com.ideez.agency.service;

import com.ideez.agency.dto.LoginRequest;
import com.ideez.agency.dto.LoginResponse;
import com.ideez.agency.entity.Employee;
import com.ideez.agency.repository.EmployeeRepository;
import com.ideez.agency.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public LoginResponse login(LoginRequest request) {

        Optional<Employee> employee = employeeRepository.findByEmail(request.getEmail());

        if (employee.isEmpty()) {
            throw new RuntimeException("Employee not found with email: " + request.getEmail());
        }

        // ✅ GET REAL OBJECT FIRST
        Employee emp = employee.get();

        // 🔥 DEBUG (correct)
        System.out.println("INPUT PASSWORD: " + request.getPassword());
        System.out.println("DB PASSWORD: " + emp.getPassword());
        System.out.println("helllllll");

        boolean match = passwordEncoder.matches(request.getPassword(), emp.getPassword());
        System.out.println("PASSWORD MATCH: " + match);

        if (!emp.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("Employee account is inactive");
        }

        if (!match) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtTokenProvider.generateToken(emp.getEmail(), emp.getId());

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setEmployeeId(emp.getId());
        response.setName(emp.getName());
        response.setEmail(emp.getEmail());
        response.setJobRole(emp.getJobRole());

        return response;
    }
}
