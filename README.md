# NexusHR – AI-Enabled HR Management System

## Overview

NexusHR is a modern full-stack HR management platform built with React, Spring Boot, JWT authentication, and PostgreSQL. The system provides a polished employee operations experience for managing team records, attendance, leave requests, performance reviews, notifications, and workforce insights from a single dashboard.

## What the project currently includes

- Secure login and protected routes
- Employee directory with add, edit, and delete workflows
- Attendance tracking with summary cards and employee-level reporting
- Leave request submission and approval workflow
- Performance review forms and review history
- Workforce insights with score-based recommendations
- Notification center for HR updates and announcements
- Dashboard analytics with quick navigation to key modules

## Current UI highlights

The latest interface uses a clean, modern design with card-based summaries, consistent spacing, status badges, and responsive forms. The screenshot set in the docs folder reflects the current experience across the main modules:

- Login page
- Dashboard overview
- Employee management
- Attendance tracking
- Leave management
- Performance reviews
- Insights dashboard
- Notifications center

## Technology Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Java 21
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate

### Database

- PostgreSQL

### Tools

- Maven
- Git
- VS Code
- Postman

---

## Project Architecture

Frontend (React + Vite)

↓

Spring Boot REST API

↓

Service Layer

↓

Repository Layer

↓

PostgreSQL Database

---

## Installation & Setup

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Demo Credentials

Use the following sample credentials for testing the current demo flow:

- Email: admin@gmail.com
- Password: 123456

---

## API Modules

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### Employees

- GET /api/employees
- POST /api/employees
- PUT /api/employees/{id}
- DELETE /api/employees/{id}

### Attendance

- POST /api/attendance/check-in/{employeeId}
- GET /api/attendance

### Leaves

- POST /api/leaves
- PUT /api/leaves/{id}/approve
- PUT /api/leaves/{id}/reject
- GET /api/leaves

### Performance

- POST /api/performance
- GET /api/performance

### Insights

- GET /api/insights

### Notifications

- POST /api/notifications
- GET /api/notifications

### Dashboard

- GET /api/dashboard/stats

---

## Project Status

This version reflects a polished HR dashboard experience with modular workflows for employee management, attendance, leave handling, performance reviews, notifications, and workforce intelligence. It provides a strong foundation for future enhancements such as PDF pay slips, advanced analytics, email-based workflows, and deeper role-based control.

---

## Author

Mohammed Maaz

**Mohammed Maaz**


---

## Project Status

✅ Completed

This project was developed as a production-style enterprise HR management platform demonstrating full-stack development, authentication, database integration, analytics, and workforce management capabilities.
