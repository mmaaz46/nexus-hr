# NexusHR – AI-Enabled Enterprise HR & Workforce Intelligence Platform

## Overview

NexusHR is a full-stack Human Resource Management System (HRMS) developed using React, Spring Boot, JWT Authentication, and PostgreSQL.

The platform streamlines employee lifecycle management, attendance tracking, leave management, payroll processing, performance reviews, workforce insights, and notifications through a secure and scalable architecture.

## Features

### Authentication & Security

* JWT Authentication
* Role-Based Access Control (RBAC)
* Secure API Access
* Protected Routes

### Employee Management

* Add Employee
* View Employee Details
* Update Employee Information
* Delete Employee Records

### Attendance Management

* Employee Check-In
* Attendance Tracking
* Attendance History

### Leave Management

* Apply Leave Requests
* Approve Leave Requests
* Reject Leave Requests
* Leave Status Tracking

### Payroll Management

* Salary Processing
* Deduction Management
* Net Salary Calculation
* Payroll Records

### Performance Management

* Employee Performance Reviews
* Rating System
* Feedback Tracking

### AI Workforce Insights

* Average Performance Analysis
* Workforce Analytics
* Attrition Risk Assessment
* Workforce Recommendations

### Notifications

* Employee Notifications
* Leave Approval Notifications
* Payroll Notifications
* Status Tracking

### Dashboard Analytics

* Total Employees
* Total Leaves
* Total Payroll Records
* Total Performance Reviews
* Workforce Statistics

---

## Technology Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Java 21
* Spring Boot 3
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* PostgreSQL

### Tools

* Maven
* Git
* GitHub
* Postman
* VS Code

---

## Project Architecture

Frontend (React + Vite)

↓

REST API (Spring Boot)

↓

Service Layer

↓

Repository Layer

↓

PostgreSQL Database

---

## Project Modules

1. Authentication Module
2. Employee Management Module
3. Attendance Management Module
4. Leave Management Module
5. Payroll Management Module
6. Performance Management Module
7. AI Workforce Insights Module
8. Notification Management Module
9. Dashboard Analytics Module

---

## Installation & Setup

### Backend Setup

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Modules

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Employees

* GET /api/employees
* POST /api/employees
* PUT /api/employees/{id}
* DELETE /api/employees/{id}

### Attendance

* POST /api/attendance/check-in/{employeeId}
* GET /api/attendance

### Leaves

* POST /api/leaves
* PUT /api/leaves/{id}/approve
* PUT /api/leaves/{id}/reject
* GET /api/leaves

### Payroll

* POST /api/payroll/generate
* GET /api/payroll

### Performance

* POST /api/performance
* GET /api/performance

### Insights

* GET /api/insights

### Notifications

* POST /api/notifications
* GET /api/notifications

---

## Security Features

* JWT Authentication
* Role-Based Authorization
* Protected APIs
* Secure Password Storage
* Spring Security Integration

---

## Future Enhancements

* Email Notifications
* PDF Payslip Generation
* Employee Profile Images
* Real AI Integration using Spring AI/OpenAI
* Charts & Advanced Analytics
* Docker Deployment
* Kubernetes Deployment
* CI/CD Pipeline

---

## Author

**Mohammed Maaz**


---

## Project Status

✅ Completed

This project was developed as a production-style enterprise HR management platform demonstrating full-stack development, authentication, database integration, analytics, and workforce management capabilities.
