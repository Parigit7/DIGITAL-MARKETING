package com.ideez.agency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private Long id;
    private String name;
    private String nic;
    private LocalDate birthday;
    private String gender;
    private String phoneNo;
    private String whatsappNo;
    private String email;
    private String address;
    private String jobRole;
    private LocalDate joinDate;
    private String jobDescription;
    private String status;
    private String password;
}
