package com.ideez.agency.controller;

import com.ideez.agency.dto.SalaryDTO;
import com.ideez.agency.service.SalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salaries")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class SalaryController {

    @Autowired
    private SalaryService salaryService;

    @GetMapping("/employee/{employeeId}/{year}/{month}")
    public ResponseEntity<?> getSalaryByEmployeeAndMonth(
            @PathVariable Long employeeId,
            @PathVariable int year,
            @PathVariable int month) {
        try {
            SalaryDTO salary = salaryService.getSalaryByEmployeeAndMonth(employeeId, year, month);
            return ResponseEntity.ok(salary);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/{year}/{month}")
    public ResponseEntity<?> getAllEmployeesSalaries(@PathVariable int year, @PathVariable int month) {
        try {
            List<SalaryDTO> salaries = salaryService.getAllEmployeesSalaries(year, month);
            return ResponseEntity.ok(salaries);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEmployeesTotalSalaries() {
        try {
            List<SalaryDTO> salaries = salaryService.getAllEmployeesTotalSalaries();
            return ResponseEntity.ok(salaries);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    public static class ErrorResponse {
        public String message;

        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}
