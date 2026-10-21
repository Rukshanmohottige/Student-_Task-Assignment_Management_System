package com.taskflow.backend.dto;

import com.taskflow.backend.model.Assignment;
import com.taskflow.backend.model.Submission;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalAssignments;
    private long pendingTasks;
    private long completedTasks;
    private long urgentTasks; // due within 48h
    private int overallProgress; // percentage 0-100
    private String sprintName;
    private List<CourseSummaryDto> courseBreakdown;
    private List<Assignment> upcomingDeadlines;
    private List<Submission> recentSubmissions;
}
