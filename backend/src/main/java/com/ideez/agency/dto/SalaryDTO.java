package com.ideez.agency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalaryDTO {
    private Long employeeId;
    private String employeeName;
    private String jobRole;
    private BigDecimal totalSalary;
    private Integer completedTasksCount;
}
