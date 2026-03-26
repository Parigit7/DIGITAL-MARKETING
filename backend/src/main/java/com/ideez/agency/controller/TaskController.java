package com.ideez.agency.controller;

import com.ideez.agency.dto.TaskDTO;
import com.ideez.agency.entity.Task;
import com.ideez.agency.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskDTO taskDTO) {
        try {
            Task task = taskService.createTask(taskDTO);
            return ResponseEntity.ok(convertToDTO(task));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        List<TaskDTO> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            return ResponseEntity.ok(convertToDTO(task.get()));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getTasksByEmployee(@PathVariable Long employeeId) {
        List<TaskDTO> tasks = taskService.getTasksByEmployee(employeeId);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getTasksByStatus(@PathVariable String status) {
        List<TaskDTO> tasks = taskService.getTasksByStatus(status);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        try {
            Task task = taskService.updateTask(id, taskDTO);
            return ResponseEntity.ok(convertToDTO(task));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.ok(new SuccessResponse("Task deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/completed/{employeeId}/{year}/{month}")
    public ResponseEntity<?> getCompletedTasksByEmployeeAndMonth(
            @PathVariable Long employeeId,
            @PathVariable int year,
            @PathVariable int month) {
        List<TaskDTO> tasks = taskService.getCompletedTasksByEmployeeAndMonth(employeeId, year, month);
        return ResponseEntity.ok(tasks);
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setCompanyName(task.getCompanyName());
        dto.setDescription(task.getDescription());
        dto.setLinks(task.getLinks());
        dto.setAssignedEmployeeId(task.getAssignedEmployee().getId());
        dto.setAssignedEmployeeName(task.getAssignedEmployee().getName());
        dto.setCompletedDate(task.getCompletedDate());
        dto.setSalary(task.getSalary());
        dto.setTaskStatus(task.getTaskStatus());
        dto.setAssignedDate(task.getAssignedDate());
        return dto;
    }

    public static class ErrorResponse {
        public String message;

        public ErrorResponse(String message) {
            this.message = message;
        }
    }

    public static class SuccessResponse {
        public String message;

        public SuccessResponse(String message) {
            this.message = message;
        }
    }
}
