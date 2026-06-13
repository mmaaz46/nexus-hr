package com.nexushr.controller;

import com.nexushr.entity.LeaveRequest;
import com.nexushr.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PostMapping
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.applyLeave(leaveRequest);
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestService.getAllLeaves();
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getLeavesByEmployee(@PathVariable Long employeeId) {
        return leaveRequestService.getLeavesByEmployee(employeeId);
    }

    @PutMapping("/{id}/approve")
    public LeaveRequest approveLeave(@PathVariable Long id) {
        return leaveRequestService.approveLeave(id);
    }

    @PutMapping("/{id}/reject")
    public LeaveRequest rejectLeave(@PathVariable Long id) {
        return leaveRequestService.rejectLeave(id);
    }
}