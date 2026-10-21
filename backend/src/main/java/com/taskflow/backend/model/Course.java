package com.taskflow.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code; // e.g. "CS 301"

    @Column(nullable = false)
    private String name; // e.g. "Database Systems"

    private String instructor; // e.g. "Prof. R. Vance"

    private String color; // e.g. "#4F46E5"

    private String icon; // Material symbol icon name e.g. "storage", "code"
}
