package com.ideez.agency.service;

import com.ideez.agency.dto.EmployeeDTO;
import com.ideez.agency.entity.Employee;
import com.ideez.agency.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Employee createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        employee.setName(employeeDTO.getName());
        employee.setNic(employeeDTO.getNic());
        employee.setBirthday(employeeDTO.getBirthday());
        employee.setGender(employeeDTO.getGender());
        employee.setPhoneNo(employeeDTO.getPhoneNo());
        employee.setWhatsappNo(employeeDTO.getWhatsappNo());
        employee.setEmail(employeeDTO.getEmail());
        employee.setAddress(employeeDTO.getAddress());
        employee.setJobRole(employeeDTO.getJobRole());
        employee.setJobDescription(employeeDTO.getJobDescription());
        employee.setJoinDate(LocalDate.now());
        employee.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));
        employee.setStatus("ACTIVE");

        return employeeRepository.save(employee);
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<EmployeeDTO> getActiveEmployees() {
        return employeeRepository.findByStatus("ACTIVE").stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Employee updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Optional<Employee> existing = employeeRepository.findById(id);
        if (existing.isPresent()) {
            Employee employee = existing.get();
            employee.setName(employeeDTO.getName());
            employee.setNic(employeeDTO.getNic());
            employee.setBirthday(employeeDTO.getBirthday());
            employee.setGender(employeeDTO.getGender());
            employee.setPhoneNo(employeeDTO.getPhoneNo());
            employee.setWhatsappNo(employeeDTO.getWhatsappNo());
            employee.setEmail(employeeDTO.getEmail());
            employee.setAddress(employeeDTO.getAddress());
            employee.setJobRole(employeeDTO.getJobRole());
            employee.setJobDescription(employeeDTO.getJobDescription());
            employee.setStatus(employeeDTO.getStatus());

            return employeeRepository.save(employee);
        }
        throw new RuntimeException("Employee not found with id: " + id);
    }

    public void deactivateEmployee(Long id) {
        Optional<Employee> existing = employeeRepository.findById(id);
        if (existing.isPresent()) {
            Employee employee = existing.get();
            employee.setStatus("INACTIVE");
            employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

    public void activateEmployee(Long id) {
        Optional<Employee> existing = employeeRepository.findById(id);
        if (existing.isPresent()) {
            Employee employee = existing.get();
            employee.setStatus("ACTIVE");
            employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

    private EmployeeDTO convertToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setNic(employee.getNic());
        dto.setBirthday(employee.getBirthday());
        dto.setGender(employee.getGender());
        dto.setPhoneNo(employee.getPhoneNo());
        dto.setWhatsappNo(employee.getWhatsappNo());
        dto.setEmail(employee.getEmail());
        dto.setAddress(employee.getAddress());
        dto.setJobRole(employee.getJobRole());
        dto.setJoinDate(employee.getJoinDate());
        dto.setJobDescription(employee.getJobDescription());
        dto.setStatus(employee.getStatus());
        return dto;
    }
}
