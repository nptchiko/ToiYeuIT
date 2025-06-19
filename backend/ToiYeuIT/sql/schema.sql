CREATE DATABASE IF NOT EXISTS ToiYeuIT;

use ToiYeuIT;

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
    gender   varchar(32) default 'm' null,
    phone    varchar(255)               null,
    role_id  int                        null,
    status  bit                        null,
    constraint email
        unique (email),
    constraint user_ibfk_1
        foreign key (role_id) references role (role_id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;;

create index role_id
    on user (role_id);


CREATE TABLE `skill` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) null
);

create table course
(
    course_id   int auto_increment
        primary key,
    title       varchar(100)                                                          null,
    description varchar(255)                                                          null,
    level       enum ('BASIC', 'INTERMEDIATE', 'ADVANCED') collate utf8mb4_unicode_ci not null,
    price       double                                                                null,
    enabled     tinyint(1)                                                            null,
    duration    int                                                                   null,
    tag         varchar(255)                                                          null,
    type        enum ('LR', 'SW')  null
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;



CREATE TABLE lesson (
    lesson_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    order_index INT NOT NULL, -- To maintain order of lessons within a course
    video_url VARCHAR(255), -- URL for the lesson video
    is_submitted  tinyint(1) default 0                 null,
    materials_url VARCHAR(255), -- URL for PDF or image materials
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

CREATE TABLE user_lesson_progress (
    progress_id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    is_submitted TINYINT(1) DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (progress_id),
    UNIQUE KEY uk_user_lesson (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (lesson_id) REFERENCES lesson(lesson_id)
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
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;  ;

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
            on update cascade on delete cascade
) CHAR SET utf8mb4 COLLATE utf8mb4_unicode_ci;


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
            on update cascade on delete cascade
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
            on update cascade on delete cascade
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

CREATE TABLE grammar (
                         grammar_id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         lesson_id BIGINT NOT NULL UNIQUE, -- Each lesson must have exactly one grammar entry
                         title VARCHAR(100) NOT NULL,
                         content TEXT NOT NULL,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                         CONSTRAINT fk_grammar_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(lesson_id) ON DELETE CASCADE
);

create table grammar_quiz
(
    grammar_quiz_id bigint auto_increment
        primary key,
    grammar_id      bigint      not null,
    question_text   text        not null,
    order_index     int         not null,
    created_at      datetime(6) null,
    updated_at      datetime(6) null,
    constraint fk_quiz_grammar
        foreign key (grammar_id) references grammar (grammar_id)
            on delete cascade
);

-- Options for quiz questions

create table quiz_option
(
    option_id       bigint auto_increment
        primary key,
    grammar_quiz_id bigint               not null,
    option_text     text                 not null,
    is_correct      tinyint(1) default 0 null,
    created_at      datetime(6)          null,
    updated_at      datetime(6)          null,
    constraint fk_option_question
        foreign key (grammar_quiz_id) references grammar_quiz (grammar_quiz_id)
            on delete cascade
);

create table quiz_user_submission
(
    submission_id      bigint auto_increment
        primary key,
    user_id            bigint                              not null,
    question_id        bigint                              not null,
    selected_option_id bigint                              not null,
    created_at         timestamp default CURRENT_TIMESTAMP null,
    updated_at         timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    constraint uk_quiz_user_question
        unique (user_id, question_id),
    constraint fk_submission_option
        foreign key (selected_option_id) references quiz_option (option_id)
            on delete cascade,
    constraint fk_submission_question
        foreign key (question_id) references grammar_quiz (grammar_quiz_id)
            on delete cascade,
    constraint fk_submission_user
        foreign key (user_id) references user (user_id)
            on delete cascade
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
            on update cascade on delete cascade
);

create index question_id
    on test_detail (question_id);


create table test_submission
(
    submission_id    bigint auto_increment
        primary key,
    test_id          int                                 null,
    last_answered_by bigint                              null,
    last_answered_at timestamp default CURRENT_TIMESTAMP null,
    score            float                               null,
    constraint test_submission_ibfk_1
        foreign key (test_id) references test (id)
            on update cascade on delete cascade,
    constraint test_submission_ibfk_2
        foreign key (last_answered_by) references user (user_id)
            on update cascade on delete cascade
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
            on update cascade on delete cascade,
    constraint FKqw150dx9te5yl1xh95r05wa0h
        foreign key (submit_id) references test_submission (submission_id)
            on update cascade on delete cascade
);

CREATE TABLE `flashcard_decks`
(
    `deck_id`     int PRIMARY KEY AUTO_INCREMENT,
    `creator_id`  bigint,
    `deck_name`   varchar(255) NOT NULL,
    `description` text,
    `created_at`  timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`creator_id`) REFERENCES `user` (`user_id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `flashcards`
(
    `card_id`       INT PRIMARY KEY AUTO_INCREMENT,
    `deck_id`       INT,
    `front_content` TEXT NOT NULL,
    `back_content`  TEXT NOT NULL,
    `audio_url`     VARCHAR(255),            -- Optional audio file link
    `is_favorite`   BOOLEAN   DEFAULT FALSE, -- Because someone out there is emotionally attached to one flashcard
    `created_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`deck_id`) REFERENCES `flashcard_decks` (`deck_id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;;

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

create table order_course
(
    user_id        bigint                                not null,
    course_id      int                                   not null,
    status         varchar(32) default 'PENDING'         null,
    payment_method varchar(32) default 'VNPAY'           not null,
    created_at     timestamp   default CURRENT_TIMESTAMP null,
    cost           double                                null,
    primary key (user_id, course_id),
    constraint order_course_ibfk_1
        foreign key (user_id) references user (user_id),
    constraint order_course_ibfk_2
        foreign key (course_id) references course (course_id)
);

create table enrollment
(
    id          bigint auto_increment
        primary key,
    enrolled_at datetime(6)                              null,
    expired_at  datetime(6)                              null,
    status      enum ('COMPLETED', 'PENDING', 'EXPIRED') null,
    course_id   int                                      null,
    user_id     bigint                                   null,
    constraint FKbhhcqkw1px6yljqg92m0sh2gt
        foreign key (course_id) references course (course_id)
            on update cascade on delete cascade,
    constraint FKgpuyid9pbfpxghv9vyhb0ictd
        foreign key (user_id) references user (user_id)
            on update cascade on delete cascade
);

create index course_id
    on order_course (course_id);
