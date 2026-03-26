package com.ideez.agency.service;

import com.ideez.agency.dto.SalaryDTO;
import com.ideez.agency.entity.Employee;
import com.ideez.agency.entity.Task;
import com.ideez.agency.repository.EmployeeRepository;
import com.ideez.agency.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SalaryService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TaskRepository taskRepository;

    public SalaryDTO getSalaryByEmployeeAndMonth(Long employeeId, int year, int month) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if (employee.isEmpty()) {
            throw new RuntimeException("Employee not found with id: " + employeeId);
        }

        List<Task> tasks = taskRepository.findCompletedTasksByEmployeeAndMonth(employeeId, year, month);
        BigDecimal totalSalary = tasks.stream()
                .map(Task::getSalary)
                .filter(salary -> salary != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        SalaryDTO dto = new SalaryDTO();
        dto.setEmployeeId(employee.get().getId());
        dto.setEmployeeName(employee.get().getName());
        dto.setJobRole(employee.get().getJobRole());
        dto.setTotalSalary(totalSalary);
        dto.setCompletedTasksCount(tasks.size());

        return dto;
    }

    public List<SalaryDTO> getAllEmployeesSalaries(int year, int month) {
        return employeeRepository.findAll().stream()
                .map(employee -> {
                    List<Task> tasks = taskRepository.findCompletedTasksByEmployeeAndMonth(
                            employee.getId(), year, month
                    );
                    BigDecimal totalSalary = tasks.stream()
                            .map(Task::getSalary)
                            .filter(salary -> salary != null)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    SalaryDTO dto = new SalaryDTO();
                    dto.setEmployeeId(employee.getId());
                    dto.setEmployeeName(employee.getName());
                    dto.setJobRole(employee.getJobRole());
                    dto.setTotalSalary(totalSalary);
                    dto.setCompletedTasksCount(tasks.size());
                    return dto;
                })
                .filter(dto -> !BigDecimal.ZERO.equals(dto.getTotalSalary()))
                .collect(Collectors.toList());
    }

    public List<SalaryDTO> getAllEmployeesTotalSalaries() {
        return employeeRepository.findAll().stream()
                .map(employee -> {
                    List<Task> tasks = taskRepository.findCompletedTasksByEmployee(employee.getId());
                    BigDecimal totalSalary = tasks.stream()
                            .map(Task::getSalary)
                            .filter(salary -> salary != null)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    SalaryDTO dto = new SalaryDTO();
                    dto.setEmployeeId(employee.getId());
                    dto.setEmployeeName(employee.getName());
                    dto.setJobRole(employee.getJobRole());
                    dto.setTotalSalary(totalSalary);
                    dto.setCompletedTasksCount(tasks.size());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
