package com.taskflow.backend.service;

import com.taskflow.backend.dto.AssignmentRequest;
import com.taskflow.backend.model.Assignment;
import com.taskflow.backend.model.Course;
import com.taskflow.backend.model.Priority;
import com.taskflow.backend.model.Status;
import com.taskflow.backend.repository.AssignmentRepository;
import com.taskflow.backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final CourseRepository courseRepository;
    private final CourseService courseService;

    public List<Assignment> getAssignments(Status status, Priority priority, String courseCode, String search) {
        if ("all".equalsIgnoreCase(courseCode)) {
            courseCode = null;
        }
        return assignmentRepository.searchAndFilter(status, priority, courseCode, search);
    }

    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found with id: " + id));
    }

    @Transactional
    public Assignment createAssignment(AssignmentRequest request) {
        Course course;
        if (request.getCourseId() != null) {
            course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found with id: " + request.getCourseId()));
        } else if (request.getCourseCode() != null && !request.getCourseCode().isBlank()) {
            course = courseService.findOrCreateCourse(request.getCourseCode(), request.getCourseName());
        } else {
            throw new RuntimeException("Course ID or Course Code must be provided");
        }

        LocalDateTime parsedDueDate = parseDueDate(request.getDueDate());
        Status status = request.getStatus() != null ? request.getStatus() : Status.PENDING;
        Integer progress = request.getProgress();
        if (progress == null) {
            progress = status == Status.COMPLETED ? 100 : 0;
        }

        Assignment assignment = Assignment.builder()
                .title(request.getTitle())
                .course(course)
                .dueDate(parsedDueDate)
                .dueDateDisplay(formatDueDateDisplay(parsedDueDate, request.getDueDate()))
                .effort(request.getEffort())
                .priority(request.getPriority() != null ? request.getPriority() : Priority.MEDIUM)
                .status(status)
                .progress(progress)
                .tag(request.getTag())
                .description(request.getDescription())
                .attachmentName(request.getAttachmentName())
                .attachmentSize(request.getAttachmentSize())
                .build();

        return assignmentRepository.save(assignment);
    }

    @Transactional
    public Assignment updateAssignment(Long id, AssignmentRequest request) {
        Assignment existing = getAssignmentById(id);

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            existing.setTitle(request.getTitle());
        }

        if (request.getCourseId() != null) {
            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            existing.setCourse(course);
        } else if (request.getCourseCode() != null && !request.getCourseCode().isBlank()) {
            existing.setCourse(courseService.findOrCreateCourse(request.getCourseCode(), request.getCourseName()));
        }

        if (request.getDueDate() != null) {
            LocalDateTime parsed = parseDueDate(request.getDueDate());
            existing.setDueDate(parsed);
            existing.setDueDateDisplay(formatDueDateDisplay(parsed, request.getDueDate()));
        }

        if (request.getEffort() != null) {
            existing.setEffort(request.getEffort());
        }

        if (request.getPriority() != null) {
            existing.setPriority(request.getPriority());
        }

        if (request.getStatus() != null) {
            existing.setStatus(request.getStatus());
            if (request.getStatus() == Status.COMPLETED && (existing.getProgress() == null || existing.getProgress() < 100)) {
                existing.setProgress(100);
            }
        }

        if (request.getProgress() != null) {
            existing.setProgress(request.getProgress());
            if (request.getProgress() >= 100) {
                existing.setStatus(Status.COMPLETED);
            }
        }

        if (request.getTag() != null) {
            existing.setTag(request.getTag());
        }

        if (request.getDescription() != null) {
            existing.setDescription(request.getDescription());
        }

        if (request.getAttachmentName() != null) {
            existing.setAttachmentName(request.getAttachmentName());
        }

        if (request.getAttachmentSize() != null) {
            existing.setAttachmentSize(request.getAttachmentSize());
        }

        return assignmentRepository.save(existing);
    }

    @Transactional
    public Assignment toggleStatus(Long id) {
        Assignment assignment = getAssignmentById(id);
        if (assignment.getStatus() == Status.COMPLETED) {
            assignment.setStatus(Status.PENDING);
            assignment.setProgress(50);
        } else {
            assignment.setStatus(Status.COMPLETED);
            assignment.setProgress(100);
        }
        return assignmentRepository.save(assignment);
    }

    @Transactional
    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
    }

    public String exportToCsv() {
        List<Assignment> assignments = assignmentRepository.findAll();
        StringBuilder csv = new StringBuilder();
        csv.append("ID,Title,Course Code,Course Name,Due Date,Priority,Status,Progress,Estimated Effort\n");

        for (Assignment a : assignments) {
            csv.append(a.getId()).append(",")
               .append("\"").append(escapeCsv(a.getTitle())).append("\",")
               .append("\"").append(escapeCsv(a.getCourse().getCode())).append("\",")
               .append("\"").append(escapeCsv(a.getCourse().getName())).append("\",")
               .append("\"").append(a.getDueDateDisplay() != null ? a.getDueDateDisplay() : "").append("\",")
               .append(a.getPriority()).append(",")
               .append(a.getStatus()).append(",")
               .append(a.getProgress() != null ? a.getProgress() : 0).append("%,")
               .append("\"").append(a.getEffort() != null ? a.getEffort() : "").append("\"\n");
        }

        return csv.toString();
    }

    private String escapeCsv(String val) {
        if (val == null) return "";
        return val.replace("\"", "\"\"");
    }

    private LocalDateTime parseDueDate(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) {
            return LocalDateTime.now().plusDays(3);
        }
        try {
            return LocalDateTime.parse(dateStr, DateTimeFormatter.ISO_DATE_TIME);
        } catch (Exception e1) {
            try {
                return LocalDateTime.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            } catch (Exception e2) {
                try {
                    return LocalDateTime.parse(dateStr + " 23:59", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
                } catch (Exception e3) {
                    return LocalDateTime.now().plusDays(2);
                }
            }
        }
    }

    private String formatDueDateDisplay(LocalDateTime dateTime, String original) {
        if (dateTime == null) return original;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy");
        return dateTime.format(formatter);
    }
}
