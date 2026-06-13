package com.nexushr.service;

import com.nexushr.entity.Employee;
import com.nexushr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nexushr.dto.EmployeeRequest;
import com.nexushr.exception.ResourceNotFoundException;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

   public Employee createEmployee(EmployeeRequest request) {
    Employee employee = new Employee();

    employee.setName(request.getName());
    employee.setEmail(request.getEmail());
    employee.setDepartment(request.getDepartment());
    employee.setSalary(request.getSalary());

    return employeeRepository.save(employee);
}

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

  public Employee updateEmployee(Long id, EmployeeRequest request) {
    Employee employee = employeeRepository.findById(id).orElseThrow();

    employee.setName(request.getName());
    employee.setEmail(request.getEmail());
    employee.setDepartment(request.getDepartment());
    employee.setSalary(request.getSalary());

    return employeeRepository.save(employee);
}

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}