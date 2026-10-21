package com.taskflow.backend.service;

import com.taskflow.backend.dto.CourseSummaryDto;
import com.taskflow.backend.dto.DashboardStatsResponse;
import com.taskflow.backend.model.Assignment;
import com.taskflow.backend.model.Status;
import com.taskflow.backend.model.Submission;
import com.taskflow.backend.repository.AssignmentRepository;
import com.taskflow.backend.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final CourseService courseService;

    public DashboardStatsResponse getDashboardStats() {
        long total = assignmentRepository.count();
        long pending = assignmentRepository.countByStatus(Status.PENDING);
        long completed = assignmentRepository.countByStatus(Status.COMPLETED);
        
        int progress = total > 0 ? (int) Math.round(((double) completed / total) * 100) : 0;

        List<CourseSummaryDto> courseBreakdown = courseService.getCourseSummaries();
        List<Assignment> upcoming = assignmentRepository.findTop5ByStatusOrderByDueDateAsc(Status.PENDING);
        List<Submission> recentSubmissions = submissionRepository.findAllByOrderBySubmittedAtDesc();

        return DashboardStatsResponse.builder()
                .totalAssignments(total)
                .pendingTasks(pending)
                .completedTasks(completed)
                .urgentTasks(Math.min(pending, 2L))
                .overallProgress(progress)
                .sprintName("Sprint 2 / Midterm")
                .courseBreakdown(courseBreakdown)
                .upcomingDeadlines(upcoming)
                .recentSubmissions(recentSubmissions)
                .build();
    }
}
