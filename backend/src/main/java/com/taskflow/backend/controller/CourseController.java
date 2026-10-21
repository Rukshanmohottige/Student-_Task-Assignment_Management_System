package com.taskflow.backend.controller;

import com.taskflow.backend.dto.CourseSummaryDto;
import com.taskflow.backend.model.Course;
import com.taskflow.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/summary")
    public ResponseEntity<List<CourseSummaryDto>> getCourseSummaries() {
        return ResponseEntity.ok(courseService.getCourseSummaries());
    }
}
