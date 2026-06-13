package com.nexushr.service;

import com.nexushr.entity.PerformanceReview;
import com.nexushr.repository.PerformanceReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerformanceReviewService {

    @Autowired
    private PerformanceReviewRepository performanceReviewRepository;

    public PerformanceReview createReview(PerformanceReview review) {
        return performanceReviewRepository.save(review);
    }

    public List<PerformanceReview> getAllReviews() {
        return performanceReviewRepository.findAll();
    }

    public List<PerformanceReview> getReviewsByEmployee(Long employeeId) {
        return performanceReviewRepository.findByEmployeeId(employeeId);
    }
}