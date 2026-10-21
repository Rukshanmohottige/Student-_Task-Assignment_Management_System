package com.taskflow.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String courseCode;

    @Column(length = 1000)
    private String subtitle;

    private String grade; // e.g. "A • 95%" or "Under Review"

    @Column(length = 1000)
    private String feedback; // e.g. "Feedback: Excellent Wireshark capture logs"

    private String status; // "GRADED" or "UNDER_REVIEW"

    private LocalDateTime submittedAt;
}
