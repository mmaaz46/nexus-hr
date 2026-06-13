package com.nexushr.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "performance_reviews")
public class PerformanceReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String reviewPeriod;
    private int rating;
    private String feedback;

    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public String getReviewPeriod() { return reviewPeriod; }
    public int getRating() { return rating; }
    public String getFeedback() { return feedback; }

    public void setId(Long id) { this.id = id; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    public void setReviewPeriod(String reviewPeriod) { this.reviewPeriod = reviewPeriod; }
    public void setRating(int rating) { this.rating = rating; }
    public void setFeedback(String feedback) { this.feedback = feedback; }
}