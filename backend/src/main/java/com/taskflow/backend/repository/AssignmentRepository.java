package com.taskflow.backend.repository;

import com.taskflow.backend.model.Assignment;
import com.taskflow.backend.model.Priority;
import com.taskflow.backend.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long>, JpaSpecificationExecutor<Assignment> {

    List<Assignment> findByStatusOrderByDueDateAsc(Status status);

    long countByStatus(Status status);

    long countByCourseId(Long courseId);

    long countByCourseIdAndStatus(Long courseId, Status status);

    @Query("SELECT a FROM Assignment a WHERE " +
           "(:status IS NULL OR a.status = :status) AND " +
           "(:priority IS NULL OR a.priority = :priority) AND " +
           "(:courseCode IS NULL OR a.course.code = :courseCode) AND " +
           "(:search IS NULL OR LOWER(a.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(a.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(a.course.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY a.status ASC, a.dueDate ASC")
    List<Assignment> searchAndFilter(
            @Param("status") Status status,
            @Param("priority") Priority priority,
            @Param("courseCode") String courseCode,
            @Param("search") String search
    );

    List<Assignment> findTop5ByStatusOrderByDueDateAsc(Status status);
}
