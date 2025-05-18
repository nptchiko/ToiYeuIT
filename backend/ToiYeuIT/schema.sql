CREATE DATABASE IF NOT EXISTS ToiYeuIT;
USE ToiYeuIT;

CREATE TABLE `role` (
  `role_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

create table user
(
    user_id  bigint auto_increment
        primary key,
    username varchar(255)               not null,
    password varchar(255)               not null,
    email    varchar(255)               not null,
    gender   varchar(32) default 'MALE' null,
    phone    varchar(255)               null,
    role_id  int                        null,
    enabled  bit                        null,
    constraint email
        unique (email),
    constraint user_ibfk_1
        foreign key (role_id) references role (role_id)
);

create index role_id
    on user (role_id);


CREATE TABLE `skill` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `course` (
                          `course_id` int PRIMARY KEY AUTO_INCREMENT,
                          `title` varchar(255) NOT NULL,
                          `description` text NOT NULL ,
                          `level`       enum ('BASIC', 'INTERMEDIATE', 'ADVANCED') not null,
                          `price` decimal(10,2) NOT NULL,
                          `enabled` boolean,
                          `duration` int,
                          `tag` varchar(50)
);
-- CREATE TABLE `lessons` (
--                            `lesson_id` int PRIMARY KEY AUTO_INCREMENT,
--                            `course_id` int,
--                            `title` varchar(255),
--                            `video_url` varchar(255),
--                            `image_url` varchar(255),
--                            `description` text,
--                            `skill_id` int,
--                            FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
--                            FOREIGN KEY (`skill_id`) REFERENCES `skill` (`id`)
-- );

-- Lesson table to store lesson information
CREATE TABLE lesson (
    lesson_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    is_submitted BOOLEAN DEFAULT FALSE,
    order_index INT NOT NULL, -- To maintain order of lessons within a course
    video_url VARCHAR(255), -- URL for the lesson video
    materials_url VARCHAR(255), -- URL for PDF or image materials
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

-- Grammar content for lessons (required for each lesson)
CREATE TABLE grammar (
    grammar_id INT PRIMARY KEY AUTO_INCREMENT,
    lesson_id INT NOT NULL UNIQUE, -- Each lesson must have exactly one grammar entry
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_grammar_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(lesson_id) ON DELETE CASCADE
);

-- Quiz questions for grammar sections
CREATE TABLE grammar_quiz (
    grammar_quiz_id INT PRIMARY KEY AUTO_INCREMENT,
    grammar_id INT NOT NULL,
    question_text TEXT NOT NULL,
    order_index INT NOT NULL, -- To maintain order of questions
    CONSTRAINT fk_quiz_grammar FOREIGN KEY (grammar_id) REFERENCES grammar(grammar_id) ON DELETE CASCADE
);

-- Options for quiz questions
CREATE TABLE quiz_option (
    option_id INT PRIMARY KEY AUTO_INCREMENT,
    grammar_quiz_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_option_question FOREIGN KEY (grammar_quiz_id) REFERENCES grammar_quiz(grammar_quiz_id) ON DELETE CASCADE
);

-- User answers to track progress
CREATE TABLE quiz_user_submission (
    submission_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    question_id INT NOT NULL,
    selected_option_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT uk_quiz_user_question UNIQUE (user_id, question_id),
    CONSTRAINT fk_submission_user FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_submission_question FOREIGN KEY (question_id) REFERENCES grammar_quiz(grammar_quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_submission_option FOREIGN KEY (selected_option_id) REFERENCES quiz_option(option_id) ON DELETE SET NULL
);

create table test_collection
(
    id          int auto_increment
        primary key,
    skill_id    int          null,
    description varchar(255) null,
    title       varchar(255) null,
    constraint test_collection_ibfk_2
        foreign key (skill_id) references skill (id)
);

create index skill_id
    on test_collection (skill_id);

create table test
(
    id                 int auto_increment
        primary key,
    test_collection_id int              not null,
    indexx            int              not null,
    title              varchar(255)     null,
    enabled            bit default b'1' null,
    constraint FK34np1jcju9km4vaswfl1oy9cp
        foreign key (test_collection_id) references test_collection (id)
);

create table question_cluster
(
    id        int auto_increment
        primary key,
    indexes   int  not null,
    paragraph text null,
    part      int  not null,
    test_id   int  null,
    constraint FKkd53425gk00tlq2lije4tdyll
        foreign key (test_id) references test (id)
);

create table question
(
    ques_id  bigint auto_increment                                                      not null
        primary key,
    description         varchar(255)                                                null,
    correct_ans         varchar(255)                                                not null,
    question_scope      enum ('TEST', '')             default 'TEST'        not null,
    question_type       enum ('MULTICHOICE', 'FILLING_BLANK') default 'MULTICHOICE' not null,
    audio_src           varchar(255)                                                null,
    img_src             varchar(255)                                                null,
    question_cluster_id int                                                         null,
    constraint question_cluster__fk
        foreign key (question_cluster_id) references question_cluster (id)
);

create table multichoice_detail
(
    id int auto_increment,
    ques_id            bigint                    not null,
    answer_key             enum ('A', 'B', 'C', 'D') not null,
    answer_description varchar(255)              null,
    primary key (id),
    constraint multichoice_detail_ibfk_1
        foreign key (ques_id) references question (ques_id)
            on update cascade on delete cascade
);

create table test_detail
(
    id int auto_increment,
    belong_to   int    not null,
    question_id bigint not null,
    part        int    not null,
    indexx     int    not null,
    primary key (id),
    constraint test_detail_ibfk_1
        foreign key (belong_to) references test (id)
            on delete cascade,
    constraint test_detail_ibfk_2
        foreign key (question_id) references question (ques_id)
);

create index question_id
    on test_detail (question_id);

CREATE TABLE `test_submission` (
  `submission_id` bigint auto_increment,
  `test_id` int,
  `last_answered_by` bigint,
  `last_answered_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `score` decimal,
  PRIMARY KEY (`submission_id`),
  FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  FOREIGN KEY (`last_answered_by`) REFERENCES `user` (`user_id`)
);

create table test_result
(
    id          int auto_increment
        primary key,
    answer      varchar(150) not null,
    part        int          not null,
    question_id bigint       null,
    submit_id   bigint       null,
    constraint FK787s15vwqnuckvarfil6r6wsk
        foreign key (question_id) references question (ques_id)
            on update cascade,
    constraint FKqw150dx9te5yl1xh95r05wa0h
        foreign key (submit_id) references test_submission (submission_id)
            on update cascade on delete cascade
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

# CREATE TABLE `enrollment` (
#   `user_id` bigint,
#   `course_id` int,
#   `status` enum('COMPLETED', 'PENDING', 'EXPIRED'),
#   `enrolled_at` timestamp DEFAULT CURRENT_TIMESTAMP,
#   `expired_at` timestamp DEFAULT CURRENT_TIMESTAMP,
#   PRIMARY KEY (`user_id`, `course_id`),
#   FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
#   FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
# );
#
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