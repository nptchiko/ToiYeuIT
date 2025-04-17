CREATE DATABASE IF NOT EXISTS ToiYeuIT;
USE ToiYeuIT;
CREATE TABLE `role` (
  `role_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `user` (
  `user_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `gender` enum('f', 'm'),
  `phone` varchar(255),
  `role_id` int,
  FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
);

CREATE TABLE `course` (
  `course_id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL ,
  `level`       enum ('Cơ bản', 'Trung cấp', 'Nâng cao') not null,
  `price` decimal(10,2) NOT NULL,
  `enabled` boolean,
  `duration` int,
  'tag' varchar(50)
);

CREATE TABLE `skill` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `lessons` (
  `lesson_id` int PRIMARY KEY AUTO_INCREMENT,
  `course_id` int,
  `title` varchar(255),
  `video_url` varchar(255),
  `image_url` varchar(255),
  `description` text,
  `skill_id` int,
  FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`)
);

CREATE TABLE `exercise` (
  `id` int AUTO_INCREMENT,
  `lesson_id` int,
  `instruction` varchar(255),
  `content` text,
  `media_url` varchar(255),
  `type` varchar(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`)
);

CREATE TABLE `question` (
  `ques_id` bigint PRIMARY KEY,
  `description` varchar(255),
  `correct_ans` varchar(255)
);

CREATE TABLE `exercise_detail` (
  `ex_id` int,
  `question_id` bigint,
  `index` int NOT NULL,
  PRIMARY KEY (`ex_id`, `question_id`),
  FOREIGN KEY (`ex_id`) REFERENCES `exercise` (`id`),
  FOREIGN KEY (`question_id`) REFERENCES `question` (`ques_id`)
);

CREATE TABLE `exercise_submission` (
  `submission_id` bigint COMMENT 'tsid',
  `ex_id` int,
  `last_answered_by` bigint,
  `last_answered_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `score` decimal,
  PRIMARY KEY (`submission_id`),
  FOREIGN KEY (`ex_id`) REFERENCES `exercise` (`id`),
  FOREIGN KEY (`last_answered_by`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `exercise_result` (
  `id` bigint,
  `ques_id` bigint,
  `answer` varchar(255) NOT NULL,
  `correct_ans` varchar(255) NOT NULL,
  PRIMARY KEY (`id`, `ques_id`),
  FOREIGN KEY (`id`) REFERENCES `exercise_submission` (`submission_id`),
  FOREIGN KEY (`ques_id`) REFERENCES `question` (`ques_id`)
);

CREATE TABLE `multichoice_detail` (
  `ques_id` bigint,
  `key` enum('A', 'B', 'C', 'D'),
  `answer_description` varchar(255),
  PRIMARY KEY (`ques_id`, `key`),
  FOREIGN KEY (`ques_id`) REFERENCES `question` (`ques_id`)
);

CREATE TABLE `test_collection` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `skill_id` int,
  FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`)
);

CREATE TABLE `test` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `test_collection_id` int,
  `index` int NOT NULL,
  `name` varchar(255),
  FOREIGN KEY (`test_collection_id`) REFERENCES `test_collection` (`id`)
);

CREATE TABLE `test_detail` (
  `belong_to` int,
  `question_id` bigint,
  `part` int NOT NULL,
  `index` int NOT NULL,
  PRIMARY KEY (`belong_to`, `question_id`),
  FOREIGN KEY (`belong_to`) REFERENCES `test` (`id`),
  FOREIGN KEY (`question_id`) REFERENCES `question` (`ques_id`)
);

CREATE TABLE `test_submission` (
  `submission_id` bigint COMMENT 'tsid - Time-Sorted Unique Identifiers',
  `test_id` int,
  `last_answered_by` bigint,
  `last_answered_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `score` decimal,
  PRIMARY KEY (`submission_id`),
  FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  FOREIGN KEY (`last_answered_by`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `test_result` (
  `id` bigint,
  `question_id` bigint,
  `answer` varchar(255) NOT NULL,
  `correct_ans` varchar(255) NOT NULL,
  PRIMARY KEY (`id`, `question_id`),
  FOREIGN KEY (`id`) REFERENCES `test_submission` (`submission_id`),
  FOREIGN KEY (`question_id`) REFERENCES `question` (`ques_id`)
);

CREATE TABLE `flashcard_decks` (
  `deck_id` int PRIMARY KEY AUTO_INCREMENT,
  `creator_id` bigint,
  `deck_name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`creator_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `flashcards` (
  `card_id` INT PRIMARY KEY AUTO_INCREMENT,
  `deck_id` INT,
  `front_content` TEXT NOT NULL,
  `back_content` TEXT NOT NULL,
  `audio_url` VARCHAR(255), -- Optional audio file link
  `is_favorite` BOOLEAN DEFAULT FALSE, -- Because someone out there is emotionally attached to one flashcard
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`deck_id`) REFERENCES `flashcard_decks` (`deck_id`)
);

CREATE TABLE `enrollment` (
  `user_id` bigint,
  `course_id` int,
  `status` enum('COMPLETED', 'PENDING', 'EXPIRED'),
  `enrolled_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `expired_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `course_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
);

CREATE TABLE `order_course` (
  `user_id` bigint,
  `course_id` int,
  `status` enum('PENDING', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `payment_method` enum('VNPAY') NOT NULL DEFAULT 'VNPAY',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `course_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
);
alter table course
    collate = utf8mb4_vietnamese_ci