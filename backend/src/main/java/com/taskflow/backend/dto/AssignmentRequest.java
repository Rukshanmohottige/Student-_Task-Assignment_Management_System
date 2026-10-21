package com.taskflow.backend.dto;

import com.taskflow.backend.model.Priority;
import com.taskflow.backend.model.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignmentRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private Long courseId;
    
    private String courseCode; // e.g. "CS 301"

    private String courseName; // if creating new course

    private String dueDate; // string or ISO date

    private String effort; // e.g. "6 hours"

    @NotNull(message = "Priority is required")
    private Priority priority;

    private Status status; // PENDING or COMPLETED

    private Integer progress; // 0 to 100

    private String tag; // e.g. "Phase 2"

    private String description;

    private String attachmentName;

    private String attachmentSize;
}
