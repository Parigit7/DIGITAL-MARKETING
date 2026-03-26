package com.ideez.agency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long id;
    private String title;
    private String companyName;
    private String description;
    private String links;
    private Long assignedEmployeeId;
    private String assignedEmployeeName;
    private LocalDate completedDate;
    private BigDecimal salary;
    private String taskStatus;
    private LocalDate assignedDate;
}
