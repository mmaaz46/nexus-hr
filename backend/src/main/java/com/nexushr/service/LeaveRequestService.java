package com.nexushr.service;

import com.nexushr.entity.LeaveRequest;
import com.nexushr.exception.ResourceNotFoundException;
import com.nexushr.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
        leaveRequest.setStatus("PENDING");
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }

    public List<LeaveRequest> getLeavesByEmployee(Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    public LeaveRequest approveLeave(Long id) {
        LeaveRequest leave = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        leave.setStatus("APPROVED");
        return leaveRequestRepository.save(leave);
    }

    public LeaveRequest rejectLeave(Long id) {
        LeaveRequest leave = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave request not found"));

        leave.setStatus("REJECTED");
        return leaveRequestRepository.save(leave);
    }
}