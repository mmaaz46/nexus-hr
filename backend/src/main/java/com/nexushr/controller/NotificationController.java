package com.nexushr.controller;

import com.nexushr.entity.Notification;
import com.nexushr.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Notification createNotification(
            @RequestBody Notification notification) {

        return notificationService.createNotification(notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Notification> getEmployeeNotifications(
            @PathVariable Long employeeId) {

        return notificationService.getEmployeeNotifications(employeeId);
    }
}