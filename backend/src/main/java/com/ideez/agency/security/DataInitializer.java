package com.ideez.agency.security;


import com.ideez.agency.entity.Employee;
import com.ideez.agency.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initAdmin(EmployeeRepository repo) {
        return args -> {

            if (repo.findByEmail("admin@gmail.com").isEmpty()) {

                Employee admin = new Employee();
                admin.setName("Admin");
                admin.setNic("123456789V");
                admin.setBirthday(LocalDate.of(2000,1,1));
                admin.setGender("Male");
                admin.setPhoneNo("0771234567");
                admin.setWhatsappNo("0771234567");
                admin.setEmail("admin@gmail.com");
                admin.setAddress("Colombo");
                admin.setJobRole("Admin");
                admin.setJoinDate(LocalDate.now());
                admin.setJobDescription("System Admin");

                // 🔥 IMPORTANT
                admin.setPassword(passwordEncoder.encode("123456"));

                admin.setStatus("ACTIVE");

                repo.save(admin);

                System.out.println("✅ Admin user created");
            }
        };
    }
}