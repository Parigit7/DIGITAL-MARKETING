package com.ideez.agency.repository;

import com.ideez.agency.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByNic(String nic);
    List<Employee> findByStatus(String status);
    List<Employee> findAll();
}
