-- TaskFlow MySQL Schema Definition

CREATE DATABASE IF NOT EXISTS taskflow_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE taskflow_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    avatar_url VARCHAR(500),
    semester VARCHAR(50),
    academic_status VARCHAR(50)
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    instructor VARCHAR(100),
    color VARCHAR(30),
    icon VARCHAR(50)
);

-- Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    course_id BIGINT NOT NULL,
    due_date DATETIME,
    due_date_display VARCHAR(100),
    effort VARCHAR(50),
    priority ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL,
    status ENUM('PENDING', 'COMPLETED') NOT NULL,
    progress INT DEFAULT 0,
    tag VARCHAR(50),
    description TEXT,
    attachment_name VARCHAR(200),
    attachment_size VARCHAR(50),
    user_id BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignment_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_assignment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Submissions Feed Table
CREATE TABLE IF NOT EXISTS submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    course_code VARCHAR(20),
    subtitle VARCHAR(200),
    grade VARCHAR(50),
    feedback VARCHAR(255),
    status VARCHAR(50),
    submitted_at DATETIME
);
