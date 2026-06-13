package com.nexushr.controller;

import com.nexushr.entity.Payroll;
import com.nexushr.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @PostMapping("/generate")
    public Payroll generatePayroll(@RequestBody Payroll payroll) {
        return payrollService.generatePayroll(payroll);
    }

    @GetMapping
    public List<Payroll> getAllPayrolls() {
        return payrollService.getAllPayrolls();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Payroll> getPayrollByEmployee(@PathVariable Long employeeId) {
        return payrollService.getPayrollByEmployee(employeeId);
    }
}