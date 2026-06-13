package com.nexushr.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payroll")
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String month;
    private double basicSalary;
    private double deductions;
    private double netSalary;
    private String status;

    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public String getMonth() { return month; }
    public double getBasicSalary() { return basicSalary; }
    public double getDeductions() { return deductions; }
    public double getNetSalary() { return netSalary; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public void setMonth(String month) { this.month = month; }
    public void setBasicSalary(double basicSalary) { this.basicSalary = basicSalary; }
    public void setDeductions(double deductions) { this.deductions = deductions; }
    public void setNetSalary(double netSalary) { this.netSalary = netSalary; }
    public void setStatus(String status) { this.status = status; }
}