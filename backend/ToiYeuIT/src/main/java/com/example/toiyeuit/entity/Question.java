package com.example.toiyeuit.entity;

import com.example.toiyeuit.enums.QuestionScope;
import com.example.toiyeuit.enums.QuestionType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.PackagePrivate;


@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String id;

    String description;

    @Column(name = "correct_ans", nullable = false)
    String correctAnswer;

    @Column(name = "ques_scope")
    @Enumerated(EnumType.STRING)
    QuestionScope questionScope;

    @Column(name = "ques_type")
    @Enumerated(EnumType.STRING)
    QuestionType questionType;

}
