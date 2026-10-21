package com.taskflow.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseSummaryDto {
    private Long id;
    private String code;
    private String name;
    private String instructor;
    private String color;
    private String icon;
    private long totalAssignments;
    private long completedAssignments;
    private int completionPercentage;
}
