1. Title Page

NEXUSHR – AI-Enabled Enterprise Human Resource Management System

Project Report

Submitted by:

Mohammed Maaz

Bachelor of Engineering (Electronics & Communication Engineering)

Technology Stack:

React
Spring Boot
PostgreSQL
JWT Authentication
Tailwind CSS

2. Abstract

NexusHR is a full-stack human resource management system designed to streamline employee operations through a modern web-based interface. The platform combines secure authentication, employee management, attendance tracking, leave coordination, performance reviews, workforce insights, and notifications into a unified experience.

The project demonstrates a practical implementation of a client-server application using React for the frontend and Spring Boot for the backend, with PostgreSQL as the persistence layer. JWT-based authentication and protected routes help ensure that HR workflows remain secure and accessible only to authorized users.

3. Introduction

Modern HR departments handle a wide range of administrative tasks that often require efficient coordination across multiple workflows. Manual management of employee records, attendance, leave requests, performance feedback, and organizational communications can become time-consuming and inconsistent.

NexusHR addresses these challenges with a centralized platform that improves operational efficiency while providing a clear and modern user experience. The system is designed to support both day-to-day HR tasks and high-level workforce monitoring through dashboards and insights.

4. Objectives

The main objectives of NexusHR are to:

- Centralize employee information management
- Simplify attendance tracking and reporting
- Support leave request submissions and approval workflows
- Manage performance reviews effectively
- Provide actionable workforce insights
- Improve internal communication through notifications
- Deliver a secure and modern HR experience

5. Technology Stack

Frontend
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS

Backend
- Java 21
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate

Database
- PostgreSQL

Development Tools
- VS Code
- Maven
- Git
- Postman

6. System Architecture

React Frontend
      │
      ▼
Spring Boot REST APIs
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
PostgreSQL Database

The frontend communicates with the backend through REST APIs using Axios. Spring Security validates JWT tokens for protected endpoints, while the service layer manages business logic and the repository layer handles database operations.

7. Modules Implemented

7.1 Authentication Module

Features:
- User login
- Registration support
- JWT token generation
- Protected route handling

7.2 Employee Management Module

Features:
- Add new employees
- View employee records
- Edit employee detail
- Delete employee entries

7.3 Attendance Management Module

Features:
- Attendance record tracking
- Summary views for present, absent, and leave states
- Employee-based attendance grouping

7.4 Leave Management Module

Features:
- Leave request submission
- Approval and rejection actions
- Leave status monitoring
- Leave request forms and summaries

7.5 Performance Management Module

Features:
- Review creation
- Rating-based scoring
- Feedback collection
- Review history display

7.6 Insights Module

Features:
- Average rating analysis
- Attrition risk evaluation
- Workforce health indicators
- Recommendation-based insight cards

7.7 Notification Module

Features:
- Create announcements
- Display unread and read statuses
- Share updates with employees

7.8 Dashboard Module

Features:
- KPI cards for employees, leaves, payrolls, and reviews
- Quick action links to major HR modules
- Central navigation for HR operations

8. Database Design

The current system uses a relational model with entities such as:

- Users
- Employees
- Attendance
- Leave Requests
- Payroll
- Performance Reviews
- Notifications

These entities support the main HR workflows and allow the frontend to display consolidated summaries across modules.

9. Screenshots and UI Summary

The project documentation includes screenshots that reflect the latest UI and workflow layout:

- Login page
- Dashboard overview
- Employee directory
- Attendance tracking
- Leave request management
- Performance review section
- AI-style insights page
- Notification center

These screenshots highlight the current visual direction, which emphasizes clarity, responsiveness, and a professional HR dashboard experience.

10. Challenges Faced

- Configuring JWT-based authentication and route protection
- Integrating the React frontend with the Spring Boot API
- Managing consistent data flow across modules
- Designing a user-friendly dashboard experience
- Aligning the documentation with the evolving application state

11. Future Enhancements

- Email-based notifications
- PDF payslip generation
- Employee profile images
- Real AI integration using modern language models
- Advanced analytics dashboards
- Docker deployment and CI/CD automation

12. Conclusion

NexusHR successfully demonstrates the implementation of a modern enterprise-level HR management system using React, Spring Boot, and PostgreSQL. The platform effectively combines essential HR workflows into a single application while showcasing strong full-stack development practices, secure authentication, structured backend APIs, and a polished user interface.

The project provides a solid foundation for future expansion into more advanced enterprise HR solutions and intelligent workforce automation.