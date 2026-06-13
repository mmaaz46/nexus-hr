package com.nexushr.controller;

import com.nexushr.dto.EmployeeRequest;
import com.nexushr.entity.Employee;
import com.nexushr.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Employee createEmployee(@Valid @RequestBody EmployeeRequest request) {

        return employeeService.createEmployee(request);
    }

    // Any logged in user
    @GetMapping
    public List<Employee> getAllEmployees() {

        return employeeService.getAllEmployees();
    }

    // Any logged in user
    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {

        return employeeService.getEmployeeById(id);
    }

    // ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Employee updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeRequest request) {

        return employeeService.updateEmployee(id, request);
    }

    // ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return "Employee deleted successfully";
    }
}