package com.ideez.agency.service;

import com.ideez.agency.dto.TaskDTO;
import com.ideez.agency.entity.Task;
import com.ideez.agency.entity.Employee;
import com.ideez.agency.repository.TaskRepository;
import com.ideez.agency.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public Task createTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setCompanyName(taskDTO.getCompanyName());
        task.setDescription(taskDTO.getDescription());
        task.setLinks(taskDTO.getLinks());
        task.setCompletedDate(taskDTO.getCompletedDate());
        task.setSalary(taskDTO.getSalary());
        task.setTaskStatus("TO_DO");

        Optional<Employee> employee = employeeRepository.findById(taskDTO.getAssignedEmployeeId());
        if (employee.isPresent()) {
            task.setAssignedEmployee(employee.get());
        } else {
            throw new RuntimeException("Employee not found with id: " + taskDTO.getAssignedEmployeeId());
        }

        return taskRepository.save(task);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<TaskDTO> getTasksByEmployee(Long employeeId) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if (employee.isPresent()) {
            return taskRepository.findByAssignedEmployee(employee.get()).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    public List<TaskDTO> getTasksByStatus(String status) {
        return taskRepository.findByTaskStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Task updateTask(Long id, TaskDTO taskDTO) {
        Optional<Task> existing = taskRepository.findById(id);
        if (existing.isPresent()) {
            Task task = existing.get();
            task.setTitle(taskDTO.getTitle());
            task.setCompanyName(taskDTO.getCompanyName());
            task.setDescription(taskDTO.getDescription());
            task.setLinks(taskDTO.getLinks());
            task.setCompletedDate(taskDTO.getCompletedDate());
            task.setSalary(taskDTO.getSalary());
            task.setTaskStatus(taskDTO.getTaskStatus());

            return taskRepository.save(task);
        }
        throw new RuntimeException("Task not found with id: " + id);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public List<TaskDTO> getCompletedTasksByEmployeeAndMonth(Long employeeId, int year, int month) {
        return taskRepository.findCompletedTasksByEmployeeAndMonth(employeeId, year, month).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
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
}
