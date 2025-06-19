
CREATE DATABASE IF NOT EXISTS ToiYeuIT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ToiYeuIT;
-- Switch to the newly created database.
USE ToiYeuIT;

--
-- Table structure for table `role`
--
CREATE TABLE `role` (
  `role_id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `user`
--
CREATE TABLE `user` (
    `user_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `gender` VARCHAR(32) DEFAULT 'm',
    `phone` VARCHAR(255),
    `role_id` INT,
    `status` BIT,
    FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `role_id` ON `user` (`role_id`);

--
-- Table structure for table `skill`
--
CREATE TABLE `skill` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `course`
--
CREATE TABLE `course` (
    `course_id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(100),
    `description` VARCHAR(255),
    `level` ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED') NOT NULL,
    `price` DOUBLE,
    `enabled` TINYINT(1),
    `duration` INT,
    `tag` VARCHAR(255),
    `type` ENUM ('LR', 'SW')
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `lesson`
--
CREATE TABLE `lesson` (
    `lesson_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `course_id` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255),
    `order_index` INT NOT NULL,
    `video_url` VARCHAR(255),
    `is_submitted` TINYINT(1) DEFAULT 0,
    `materials_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`course_id`) REFERENCES `course`(`course_id`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `user_lesson_progress`
--
CREATE TABLE `user_lesson_progress` (
    `progress_id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `lesson_id` BIGINT NOT NULL,
    `is_submitted` TINYINT(1) DEFAULT 0,
    `last_accessed` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_user_lesson` (`user_id`, `lesson_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`),
    FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`lesson_id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `test_collection`
--
CREATE TABLE `test_collection` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `skill_id` INT,
    `description` VARCHAR(255),
    `title` VARCHAR(255),
    FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `skill_id` ON `test_collection` (`skill_id`);

--
-- Table structure for table `test`
--
CREATE TABLE `test` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `test_collection_id` INT NOT NULL,
    `indexx` INT NOT NULL,
    `title` VARCHAR(255),
    `enabled` BIT DEFAULT b'1',
    FOREIGN KEY (`test_collection_id`) REFERENCES `test_collection` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `question_cluster`
--
CREATE TABLE `question_cluster` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `indexes` INT NOT NULL,
    `paragraph` TEXT,
    `part` INT NOT NULL,
    `test_id` INT,
    FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `question`
--
CREATE TABLE `question` (
    `ques_id` BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `description` VARCHAR(255),
    `correct_ans` VARCHAR(255) NOT NULL,
    `question_scope` ENUM ('TEST', '') DEFAULT 'TEST' NOT NULL,
    `question_type` ENUM ('MULTICHOICE', 'FILLING_BLANK') DEFAULT 'MULTICHOICE' NOT NULL,
    `audio_src` VARCHAR(255),
    `img_src` VARCHAR(255),
    `question_cluster_id` INT,
    FOREIGN KEY (`question_cluster_id`) REFERENCES `question_cluster` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `multichoice_detail`
--
CREATE TABLE `multichoice_detail` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `ques_id` BIGINT NOT NULL,
    `answer_key` ENUM ('A', 'B', 'C', 'D') NOT NULL,
    `answer_description` VARCHAR(255),
    FOREIGN KEY (`ques_id`) REFERENCES `question` (`ques_id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `grammar`
--
CREATE TABLE `grammar` (
    `grammar_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `lesson_id` BIGINT NOT NULL UNIQUE,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`lesson_id`) REFERENCES `lesson` (`lesson_id`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `grammar_quiz`
--
CREATE TABLE `grammar_quiz` (
    `grammar_quiz_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `grammar_id` BIGINT NOT NULL,
    `question_text` TEXT NOT NULL,
    `order_index` INT NOT NULL,
    `created_at` DATETIME(6),
    `updated_at` DATETIME(6),
    FOREIGN KEY (`grammar_id`) REFERENCES `grammar` (`grammar_id`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `quiz_option`
--
CREATE TABLE `quiz_option` (
    `option_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `grammar_quiz_id` BIGINT NOT NULL,
    `option_text` TEXT NOT NULL,
    `is_correct` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME(6),
    `updated_at` DATETIME(6),
    FOREIGN KEY (`grammar_quiz_id`) REFERENCES `grammar_quiz` (`grammar_quiz_id`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `quiz_user_submission`
--
CREATE TABLE `quiz_user_submission` (
    `submission_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `question_id` BIGINT NOT NULL,
    `selected_option_id` BIGINT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `uk_quiz_user_question` (`user_id`, `question_id`),
    FOREIGN KEY (`selected_option_id`) REFERENCES `quiz_option` (`option_id`) ON DELETE CASCADE,
    FOREIGN KEY (`question_id`) REFERENCES `grammar_quiz` (`grammar_quiz_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `test_detail`
--
CREATE TABLE `test_detail` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `belong_to` INT NOT NULL,
    `question_id` BIGINT NOT NULL,
    `part` INT NOT NULL,
    `indexx` INT NOT NULL,
    FOREIGN KEY (`belong_to`) REFERENCES `test` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`question_id`) REFERENCES `question` (`ques_id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `question_id` ON `test_detail` (`question_id`);

--
-- Table structure for table `test_submission`
--
CREATE TABLE `test_submission` (
    `submission_id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `test_id` INT,
    `last_answered_by` BIGINT,
    `last_answered_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `score` FLOAT,
    FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`last_answered_by`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `test_result`
--
CREATE TABLE `test_result` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `answer` VARCHAR(150) NOT NULL,
    `part` INT NOT NULL,
    `question_id` BIGINT,
    `submit_id` BIGINT,
    FOREIGN KEY (`question_id`) REFERENCES `question` (`ques_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`submit_id`) REFERENCES `test_submission` (`submission_id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `flashcard_decks`
--
CREATE TABLE `flashcard_decks` (
  `deck_id` INT PRIMARY KEY AUTO_INCREMENT,
  `creator_id` BIGINT,
  `deck_name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`creator_id`) REFERENCES `user` (`user_id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `flashcards`
--
CREATE TABLE `flashcards` (
  `card_id` INT PRIMARY KEY AUTO_INCREMENT,
  `deck_id` INT,
  `front_content` TEXT NOT NULL,
  `back_content` TEXT NOT NULL,
  `audio_url` VARCHAR(255),
  `is_favorite` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`deck_id`) REFERENCES `flashcard_decks` (`deck_id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `order_course`
--
CREATE TABLE `order_course` (
    `user_id` BIGINT NOT NULL,
    `course_id` INT NOT NULL,
    `status` VARCHAR(32) DEFAULT 'PENDING',
    `payment_method` VARCHAR(32) DEFAULT 'VNPAY' NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `cost` DOUBLE,
    PRIMARY KEY (`user_id`, `course_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX `course_id` ON `order_course` (`course_id`);

--
-- Table structure for table `enrollment`
--
CREATE TABLE `enrollment` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `enrolled_at` DATETIME(6),
    `expired_at` DATETIME(6),
    `status` ENUM ('COMPLETED', 'PENDING', 'EXPIRED'),
    `course_id` INT,
    `user_id` BIGINT,
    FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

