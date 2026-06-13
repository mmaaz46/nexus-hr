package com.nexushr.service;

import com.nexushr.entity.Payroll;
import com.nexushr.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    public Payroll generatePayroll(Payroll payroll) {
        double netSalary = payroll.getBasicSalary() - payroll.getDeductions();

        payroll.setNetSalary(netSalary);
        payroll.setStatus("GENERATED");

        return payrollRepository.save(payroll);
    }

    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    public List<Payroll> getPayrollByEmployee(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }
}