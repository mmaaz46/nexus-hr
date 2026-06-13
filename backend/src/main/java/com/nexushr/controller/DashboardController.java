package com.nexushr.controller;

import com.nexushr.repository.EmployeeRepository;
import com.nexushr.repository.LeaveRequestRepository;
import com.nexushr.repository.PayrollRepository;
import com.nexushr.repository.PerformanceReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private PerformanceReviewRepository performanceReviewRepository;
   
   @PreAuthorize("isAuthenticated()")
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();

        stats.put("totalEmployees", employeeRepository.count());
        stats.put("totalLeaves", leaveRequestRepository.count());
        stats.put("totalPayrolls", payrollRepository.count());
        stats.put("totalPerformanceReviews", performanceReviewRepository.count());

        return stats;
    }
}