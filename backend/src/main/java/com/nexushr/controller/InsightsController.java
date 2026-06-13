package com.nexushr.controller;

import com.nexushr.entity.PerformanceReview;
import com.nexushr.repository.EmployeeRepository;
import com.nexushr.repository.LeaveRequestRepository;
import com.nexushr.repository.PerformanceReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/insights")
public class InsightsController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private PerformanceReviewRepository performanceReviewRepository;

    @GetMapping
    public Map<String, Object> getInsights() {
        Map<String, Object> insights = new HashMap<>();

        long totalEmployees = employeeRepository.count();
        long totalLeaves = leaveRequestRepository.count();

        List<PerformanceReview> reviews = performanceReviewRepository.findAll();

        double avgRating = reviews.stream()
                .mapToInt(PerformanceReview::getRating)
                .average()
                .orElse(0.0);

        String attritionRisk;

        if (avgRating < 2.5 || totalLeaves > totalEmployees * 3) {
            attritionRisk = "HIGH";
        } else if (avgRating < 3.5) {
            attritionRisk = "MEDIUM";
        } else {
            attritionRisk = "LOW";
        }

        String message = "Workforce is stable";

        if ("HIGH".equals(attritionRisk)) {
            message = "High attrition risk detected. Review employee workload and engagement.";
        } else if ("MEDIUM".equals(attritionRisk)) {
            message = "Moderate risk. Monitor performance and leave trends.";
        }

        insights.put("totalEmployees", totalEmployees);
        insights.put("totalLeaves", totalLeaves);
        insights.put("averageRating", avgRating);
        insights.put("attritionRisk", attritionRisk);
        insights.put("recommendation", message);

        return insights;
    }
}