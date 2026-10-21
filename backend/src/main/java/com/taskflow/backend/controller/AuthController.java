package com.taskflow.backend.controller;

import com.taskflow.backend.dto.AuthResponse;
import com.taskflow.backend.dto.LoginRequest;
import com.taskflow.backend.model.User;
import com.taskflow.backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    // Fallback to first student if demo email entered
                    return userRepository.findAll().stream().findFirst()
                            .orElseGet(() -> userRepository.save(User.builder()
                                    .email(request.getEmail())
                                    .password(request.getPassword())
                                    .fullName("Alex Chen")
                                    .department("Computer Science B.S.")
                                    .semester("Spring 2025")
                                    .academicStatus("Week 8 • On Track")
                                    .build()));
                });

        AuthResponse response = AuthResponse.builder()
                .token(UUID.randomUUID().toString())
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .department(user.getDepartment())
                .avatarUrl(user.getAvatarUrl())
                .semester(user.getSemester())
                .academicStatus(user.getAcademicStatus())
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        return userRepository.findAll().stream().findFirst()
                .map(user -> ResponseEntity.ok(AuthResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .department(user.getDepartment())
                        .avatarUrl(user.getAvatarUrl())
                        .semester(user.getSemester())
                        .academicStatus(user.getAcademicStatus())
                        .build()))
                .orElse(ResponseEntity.notFound().build());
    }
}
