package com.taskflow.backend.service;

import com.taskflow.backend.model.*;
import com.taskflow.backend.repository.AssignmentRepository;
import com.taskflow.backend.repository.CourseRepository;
import com.taskflow.backend.repository.SubmissionRepository;
import com.taskflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already initialized. Skipping demo seed data.");
            return;
        }

        log.info("Seeding TaskFlow initial demo dataset...");

        // 1. Seed User
        User alex = User.builder()
                .email("alex.chen@university.edu")
                .password("studentPass2025")
                .fullName("Alex Chen")
                .department("Computer Science B.S.")
                .semester("Spring 2025")
                .academicStatus("Week 8 • On Track")
                .avatarUrl("https://lh3.googleusercontent.com/aida-public/AB6AXuCVhAqj2LYI_zLL8PMNsA-yWApXAgQTs9R_UDXfKsgQqyzLd0PcBg-x1rgQyeTBoxlyTRdBPxOjkuEEH94YPsyb68aDs3PgloSqJyR7n4D_jiLxheR_T3xvR2_LVVA5d9mcrPc99G6lIq35LmZitFSvqb4G78UGkklmGxK0vSB2gegnizsTqfJVpmOousKCKn13CUQpMbwuaaz3qxsROnHxQh6vXEBjswl5r2LmbaxpLHZicdt7uCVNUw")
                .build();
        userRepository.save(alex);

        // 2. Seed Courses
        Course cs301 = courseRepository.save(Course.builder().code("CS 301").name("Database Systems").instructor("Prof. R. Vance").color("#3525cd").icon("storage").build());
        Course cs340 = courseRepository.save(Course.builder().code("CS 340").name("Web Systems Architecture").instructor("Prof. M. Jenkins").color("#005338").icon("code").build());
        Course cs480 = courseRepository.save(Course.builder().code("CS 480").name("Machine Learning & Neural Nets").instructor("Dr. S. Roy").color("#4d44e3").icon("psychology").build());
        Course mat210 = courseRepository.save(Course.builder().code("MAT 210").name("Discrete Mathematics").instructor("Prof. T. Liu").color("#565e74").icon("calculate").build());
        Course eng105 = courseRepository.save(Course.builder().code("ENG 105").name("Technical Writing").instructor("Dr. H. Keller").color("#3525cd").icon("description").build());
        Course cs350 = courseRepository.save(Course.builder().code("CS 350").name("Computer Networks").instructor("Prof. A. Diaz").color("#006e4b").icon("lan").build());

        // 3. Seed Assignments
        LocalDateTime now = LocalDateTime.now();

        List<Assignment> assignments = List.of(
            // High Priority Pending
            Assignment.builder()
                .title("Database Systems Project — Phase 2: Schema Design & SQL Queries")
                .course(cs301)
                .dueDate(now.plusDays(1).withHour(23).withMinute(59))
                .dueDateDisplay("Tomorrow, 11:59 PM")
                .effort("8 hours")
                .priority(Priority.HIGH)
                .status(Status.PENDING)
                .progress(75)
                .tag("Phase 2")
                .description("Deliver relational normalization proof up to BCNF and benchmark index query execution plans.")
                .attachmentName("db_schema_v2.sql")
                .attachmentSize("2.4 MB")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Web Development Coursework — Fullstack REST API")
                .course(cs340)
                .dueDate(now.plusDays(4).withHour(23).withMinute(59))
                .dueDateDisplay("Oct 24, 2025")
                .effort("10 hours")
                .priority(Priority.MEDIUM)
                .status(Status.PENDING)
                .progress(40)
                .tag("Module 4")
                .description("Implement OAuth 2.0 PKCE auth flow with refresh tokens and OpenAPI v3 Swagger specs.")
                .attachmentName("openapi_spec.yaml")
                .attachmentSize("480 KB")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Machine Learning Report — Linear & Logistic Regression Analysis")
                .course(cs480)
                .dueDate(now.plusDays(8).withHour(23).withMinute(59))
                .dueDateDisplay("Oct 28, 2025")
                .effort("12 hours")
                .priority(Priority.HIGH)
                .status(Status.PENDING)
                .progress(20)
                .tag("Lab Report")
                .description("Comparative gradient descent optimization curves and cross-validation confusion matrixes.")
                .attachmentName("model_eval_dataset.csv")
                .attachmentSize("15.1 MB")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Discrete Mathematics Problem Set #5")
                .course(mat210)
                .dueDate(now.plusDays(13).withHour(23).withMinute(59))
                .dueDateDisplay("Nov 02, 2025")
                .effort("5 hours")
                .priority(Priority.LOW)
                .status(Status.PENDING)
                .progress(10)
                .tag("Problem Set")
                .description("Combinatorics proofs, pigeonhole principle applications, and graph isomorphism lemmas.")
                .user(alex)
                .build(),

            // Completed Assignments
            Assignment.builder()
                .title("Computer Networks Socket Programming Lab")
                .course(cs350)
                .dueDate(now.minusDays(10))
                .dueDateDisplay("Oct 10, 2025")
                .effort("6 hours")
                .priority(Priority.MEDIUM)
                .status(Status.COMPLETED)
                .progress(100)
                .tag("Lab 3")
                .description("TCP and UDP socket communication benchmark with wireshark packet captures.")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Relational Algebra Homework #3")
                .course(cs301)
                .dueDate(now.minusDays(12))
                .dueDateDisplay("Oct 08, 2025")
                .effort("4 hours")
                .priority(Priority.LOW)
                .status(Status.COMPLETED)
                .progress(100)
                .tag("Homework")
                .description("Complex relational algebra query representations and relational calculus equivalences.")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Technical Specification Draft for Web Architecture")
                .course(eng105)
                .dueDate(now.minusDays(15))
                .dueDateDisplay("Oct 05, 2025")
                .effort("4 hours")
                .priority(Priority.LOW)
                .status(Status.COMPLETED)
                .progress(100)
                .tag("Tech Writing")
                .description("IEEE formatted software architectural design description paper.")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("B+ Tree Indexing Engine")
                .course(cs301)
                .dueDate(now.minusDays(22))
                .dueDateDisplay("Sep 28, 2025")
                .effort("14 hours")
                .priority(Priority.HIGH)
                .status(Status.COMPLETED)
                .progress(100)
                .tag("Milestone 1")
                .description("In-memory B+ tree implementation supporting concurrent range scans.")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Graph Theory Problem Set 4")
                .course(mat210)
                .dueDate(now.minusDays(28))
                .dueDateDisplay("Sep 22, 2025")
                .effort("6 hours")
                .priority(Priority.MEDIUM)
                .status(Status.COMPLETED)
                .progress(100)
                .tag("Problem Set")
                .description("Eulerian circuits and Hamiltonian cycle proofs.")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("CNN Gradient Backprop Lab")
                .course(cs480)
                .dueDate(now.minusDays(35))
                .dueDateDisplay("Sep 15, 2025")
                .effort("8 hours")
                .priority(Priority.HIGH)
                .status(Status.COMPLETED)
                .progress(100)
                .tag("Lab 1")
                .description("Convolutional filter backward pass derivation from first mathematical principles.")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Asymptotic Complexity Analysis Quiz")
                .course(mat210)
                .dueDate(now.minusDays(40))
                .dueDateDisplay("Sep 10, 2025")
                .effort("3 hours")
                .priority(Priority.LOW)
                .status(Status.COMPLETED)
                .progress(100)
                .tag("Quiz")
                .description("Big-O, Omega, and Theta proof master theorem applications.")
                .user(alex)
                .build(),

            Assignment.builder()
                .title("Distributed Consensus & Raft Protocol Engine")
                .course(cs340)
                .dueDate(now.plusDays(5).withHour(23).withMinute(59))
                .dueDateDisplay("Oct 25, 2025")
                .effort("6 hours")
                .priority(Priority.HIGH)
                .status(Status.PENDING)
                .progress(0)
                .tag("Core Project")
                .description("Implement state machine safety invariants in Go. Submit unit test suites and PDF design report via GitHub Classroom.")
                .attachmentName("raft-consensus-specification.pdf")
                .attachmentSize("1.4 MB")
                .user(alex)
                .build()
        );

        assignmentRepository.saveAll(assignments);

        // 4. Seed Recent Submissions Feed
        List<Submission> submissions = List.of(
            Submission.builder()
                .title("Computer Networks Lab 3")
                .courseCode("CS 350")
                .subtitle("Submitted Yesterday • Handshake Protocol")
                .grade("A • 95%")
                .feedback("Feedback: Excellent Wireshark capture logs")
                .status("GRADED")
                .submittedAt(now.minusDays(1))
                .build(),

            Submission.builder()
                .title("Software Architecture Diagram")
                .courseCode("CS 340")
                .subtitle("Submitted Oct 14 • Microservices C4 Model")
                .grade("Under Review")
                .feedback("Instructor grading in progress")
                .status("UNDER_REVIEW")
                .submittedAt(now.minusDays(6))
                .build()
        );

        submissionRepository.saveAll(submissions);
        log.info("TaskFlow initial demo dataset seeding completed successfully.");
    }
}
