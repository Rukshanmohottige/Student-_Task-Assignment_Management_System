package com.taskflow.backend.service;

import com.taskflow.backend.dto.CourseSummaryDto;
import com.taskflow.backend.model.Course;
import com.taskflow.backend.model.Status;
import com.taskflow.backend.repository.AssignmentRepository;
import com.taskflow.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final AssignmentRepository assignmentRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<CourseSummaryDto> getCourseSummaries() {
        return courseRepository.findAll().stream().map(course -> {
            long total = assignmentRepository.countByCourseId(course.getId());
            long completed = assignmentRepository.countByCourseIdAndStatus(course.getId(), Status.COMPLETED);
            int percentage = total > 0 ? (int) Math.round(((double) completed / total) * 100) : 0;
            return CourseSummaryDto.builder()
                    .id(course.getId())
                    .code(course.getCode())
                    .name(course.getName())
                    .instructor(course.getInstructor())
                    .color(course.getColor())
                    .icon(course.getIcon())
                    .totalAssignments(total)
                    .completedAssignments(completed)
                    .completionPercentage(percentage)
                    .build();
        }).collect(Collectors.toList());
    }

    public Course findOrCreateCourse(String code, String name) {
        return courseRepository.findByCode(code).orElseGet(() -> {
            Course newCourse = Course.builder()
                    .code(code)
                    .name(name != null && !name.isBlank() ? name : code)
                    .color("#4F46E5")
                    .icon("school")
                    .build();
            return courseRepository.save(newCourse);
        });
    }
}
