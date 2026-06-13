package com.nexushr.controller;

import com.nexushr.entity.PerformanceReview;
import com.nexushr.service.PerformanceReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performance")
public class PerformanceReviewController {

    @Autowired
    private PerformanceReviewService performanceReviewService;

    @PostMapping
    public PerformanceReview createReview(@RequestBody PerformanceReview review) {
        return performanceReviewService.createReview(review);
    }

    @GetMapping
    public List<PerformanceReview> getAllReviews() {
        return performanceReviewService.getAllReviews();
    }

    @GetMapping("/employee/{employeeId}")
    public List<PerformanceReview> getReviewsByEmployee(@PathVariable Long employeeId) {
        return performanceReviewService.getReviewsByEmployee(employeeId);
    }
}