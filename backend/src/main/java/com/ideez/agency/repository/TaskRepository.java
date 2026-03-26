package com.ideez.agency.repository;

import com.ideez.agency.entity.Task;
import com.ideez.agency.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedEmployee(Employee employee);
    List<Task> findByTaskStatus(String taskStatus);
    
    @Query("SELECT t FROM Task t WHERE t.taskStatus = 'COMPLETED' " +
           "AND YEAR(t.completedDate) = :year " +
           "AND MONTH(t.completedDate) = :month")
    List<Task> findCompletedTasksByYearMonth(@Param("year") int year, @Param("month") int month);
    
    @Query("SELECT t FROM Task t WHERE t.assignedEmployee.id = :employeeId " +
           "AND t.taskStatus = 'COMPLETED'")
    List<Task> findCompletedTasksByEmployee(@Param("employeeId") Long employeeId);
    
    @Query("SELECT t FROM Task t WHERE t.assignedEmployee.id = :employeeId " +
           "AND t.taskStatus = 'COMPLETED' " +
           "AND YEAR(t.completedDate) = :year " +
           "AND MONTH(t.completedDate) = :month")
    List<Task> findCompletedTasksByEmployeeAndMonth(@Param("employeeId") Long employeeId, 
                                                     @Param("year") int year, 
                                                     @Param("month") int month);
}
