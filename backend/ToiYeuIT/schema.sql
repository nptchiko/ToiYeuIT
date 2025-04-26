-- Create the ToiYeuIT database
CREATE DATABASE IF NOT EXISTS ToiYeuIT;
USE ToiYeuIT;

-- Drop tables in reverse order to avoid foreign key constraints
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS test_result;
DROP TABLE IF EXISTS test_submission;
DROP TABLE IF EXISTS test_detail;
DROP TABLE IF EXISTS question_cluster;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS test_collection;
DROP TABLE IF EXISTS multichoice_detail;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS exercise_result;
DROP TABLE IF EXISTS exercise_submission;
DROP TABLE IF EXISTS exercise_detail;
DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS order_course;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS flashcards;
DROP TABLE IF EXISTS flashcard_decks;
DROP TABLE IF EXISTS verification_token;
DROP TABLE IF EXISTS invalid_token;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS skill;

SET FOREIGN_KEY_CHECKS = 1;

-- Create tables

-- Role table
CREATE TABLE role (
                      role_id INT PRIMARY KEY AUTO_INCREMENT,
                      name VARCHAR(50) NOT NULL
);

-- Skill table
CREATE TABLE skill (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       name VARCHAR(100) NOT NULL
);

-- User table
CREATE TABLE user (
                      user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
                      username VARCHAR(50),
                      password VARCHAR(255) NOT NULL,
                      email VARCHAR(100) NOT NULL,
                      gender VARCHAR(32) DEFAULT 'MALE',
                      phone VARCHAR(20),
                      role_id INT,
                      enabled BOOLEAN DEFAULT FALSE,
                      FOREIGN KEY (role_id) REFERENCES role(role_id)
);

-- Invalid token table
CREATE TABLE invalid_token (
                               id VARCHAR(255) PRIMARY KEY,
                               expiry_time DATETIME NOT NULL
);

-- Verification token table
CREATE TABLE verification_token (
                                    id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                    token VARCHAR(255) NOT NULL,
                                    user_id BIGINT NOT NULL,
                                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    confirm_at DATETIME,
                                    expiry_date DATETIME NOT NULL,
                                    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Flashcard deck table
CREATE TABLE flashcard_decks (
                                 deck_id INT PRIMARY KEY AUTO_INCREMENT,
                                 deck_name VARCHAR(100) NOT NULL,
                                 description TEXT,
                                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                 creator_id BIGINT,
                                 FOREIGN KEY (creator_id) REFERENCES user(user_id)
);

-- Flashcard table
CREATE TABLE flashcards (
                            card_id INT PRIMARY KEY AUTO_INCREMENT,
                            deck_id INT,
                            front_content TEXT NOT NULL,
                            back_content TEXT,
                            audio_url VARCHAR(255),
                            is_favorite BOOLEAN DEFAULT FALSE,
                            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (deck_id) REFERENCES flashcard_decks(deck_id)
);

-- Course table
CREATE TABLE course (
                        course_id INT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(100),
                        description TEXT,
                        level VARCHAR(50) DEFAULT 'BASIC',
                        price DOUBLE,
                        enabled BOOLEAN,
                        duration INT,
                        tag VARCHAR(255),
                        type VARCHAR(50)
);

-- Order course table
CREATE TABLE order_course (
                              course_id INT,
                              user_id BIGINT,
                              status VARCHAR(32) DEFAULT 'PENDING',
                              payment_method VARCHAR(32) DEFAULT 'VNPAY',
                              PRIMARY KEY (course_id, user_id),
                              FOREIGN KEY (course_id) REFERENCES course(course_id),
                              FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Enrollment table
CREATE TABLE enrollment (
                            id BIGINT PRIMARY KEY AUTO_INCREMENT,
                            user_id BIGINT,
                            course_id INT,
                            status ENUM('COMPLETED', 'PENDING', 'EXPIRED'),
                            enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                            expired_at DATETIME,
                            FOREIGN KEY (user_id) REFERENCES user(user_id),
                            FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Lesson table
CREATE TABLE lessons (
                         lesson_id INT PRIMARY KEY AUTO_INCREMENT,
                         course_id INT,
                         title VARCHAR(255),
                         video_url VARCHAR(255),
                         image_url VARCHAR(255),
                         description TEXT,
                         skill_id INT,
                         FOREIGN KEY (course_id) REFERENCES course(course_id),
                         FOREIGN KEY (skill_id) REFERENCES skill(id)
);

-- Question table
CREATE TABLE question (
                          ques_id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          description TEXT,
                          correct_ans VARCHAR(255) NOT NULL,
                          question_scope VARCHAR(50) DEFAULT 'TEST',
                          question_type VARCHAR(50) DEFAULT 'MULTICHOICE',
                          img_src VARCHAR(255),
                          audio_src VARCHAR(255)
);

-- Multichoice detail table
CREATE TABLE multichoice_detail (
                                    key VARCHAR(50),
                                    question_id BIGINT,
                                    answer_description TEXT,
                                    PRIMARY KEY (key, question_id),
                                    FOREIGN KEY (question_id) REFERENCES question(ques_id)
);

-- Exercise table
CREATE TABLE exercise (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          lesson_id INT,
                          instruction TEXT,
                          content TEXT,
                          media_url VARCHAR(255),
                          type VARCHAR(50),
                          FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id)
);

-- Exercise detail table
CREATE TABLE exercise_detail (
                                 exercise_id INT,
                                 question_id BIGINT,
                                 `index` INT NOT NULL,
                                 PRIMARY KEY (exercise_id, question_id),
                                 FOREIGN KEY (exercise_id) REFERENCES exercise(id),
                                 FOREIGN KEY (question_id) REFERENCES question(ques_id)
);

-- Exercise submission table
CREATE TABLE exercise_submission (
                                     submission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                     ex_id INT,
                                     last_answered_by BIGINT,
                                     last_answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                     score FLOAT,
                                     FOREIGN KEY (ex_id) REFERENCES exercise(id),
                                     FOREIGN KEY (last_answered_by) REFERENCES user(user_id)
);

-- Exercise result table
CREATE TABLE exercise_result (
                                 submit_id BIGINT,
                                 ques_id BIGINT,
                                 answer VARCHAR(30) NOT NULL,
                                 correct_ans VARCHAR(30) NOT NULL,
                                 PRIMARY KEY (submit_id, ques_id),
                                 FOREIGN KEY (submit_id) REFERENCES exercise_submission(submission_id),
                                 FOREIGN KEY (ques_id) REFERENCES question(ques_id)
);

-- Test collection table
CREATE TABLE test_collection (
                                 id INT PRIMARY KEY AUTO_INCREMENT,
                                 title VARCHAR(255),
                                 description TEXT,
                                 skill_id INT,
                                 FOREIGN KEY (skill_id) REFERENCES skill(id)
);

-- Test table
CREATE TABLE test (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      title VARCHAR(255),
                      `index` INT,
                      test_collection_id INT,
                      enabled BOOLEAN DEFAULT TRUE,
                      FOREIGN KEY (test_collection_id) REFERENCES test_collection(id)
);

-- Question cluster table
CREATE TABLE question_cluster (
                                  id INT PRIMARY KEY AUTO_INCREMENT,
                                  part INT NOT NULL,
                                  indexes INT NOT NULL,
                                  paragraph TEXT,
                                  test_id INT,
                                  FOREIGN KEY (test_id) REFERENCES test(id)
);

-- Test detail table
CREATE TABLE test_detail (
                             test_id INT,
                             ques_id BIGINT,
                             `index` INT NOT NULL,
                             part INT NOT NULL,
                             PRIMARY KEY (test_id, ques_id),
                             FOREIGN KEY (test_id) REFERENCES test(id),
                             FOREIGN KEY (ques_id) REFERENCES question(ques_id),
                             CONSTRAINT check_part_range CHECK (part BETWEEN 1 AND 7)
);

-- Test submission table
CREATE TABLE test_submission (
                                 submission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                 test_id INT,
                                 last_answered_by BIGINT,
                                 last_answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                                 score FLOAT,
                                 FOREIGN KEY (test_id) REFERENCES test(id),
                                 FOREIGN KEY (last_answered_by) REFERENCES user(user_id)
);

-- Test result table
CREATE TABLE test_result (
                             id INT PRIMARY KEY AUTO_INCREMENT,
                             submit_id BIGINT,
                             question_id BIGINT,
                             answer VARCHAR(30) NOT NULL,
                             part INT,
                             FOREIGN KEY (submit_id) REFERENCES test_submission(submission_id),
                             FOREIGN KEY (question_id) REFERENCES question(ques_id)
);
