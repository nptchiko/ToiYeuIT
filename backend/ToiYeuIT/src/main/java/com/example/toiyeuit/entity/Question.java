package com.example.toiyeuit.entity;

import com.example.toiyeuit.enums.QuestionScope;
import com.example.toiyeuit.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.PackagePrivate;


@Entity
@Table(name = "Question")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ques_id")
    Long id;

    String description;

    @Column(name = "correct_ans", nullable = false)
    String correctAnswer;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(32) default 'TEST'")
    QuestionScope questionScope = QuestionScope.TEST;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(32) default 'MULTICHOICE'")
    QuestionType questionType = QuestionType.MULTICHOICE;


}
