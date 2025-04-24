package com.example.toiyeuit.entity.question;

import com.example.toiyeuit.enums.QuestionScope;
import com.example.toiyeuit.enums.QuestionType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;


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
    QuestionScope questionScope = QuestionScope.TEST;

    @Enumerated(EnumType.STRING)
    QuestionType questionType = QuestionType.MULTICHOICE;

    @Column(name = "img_src")
    String imageSource;

    @Column(name = "audio_src")
    String audioSource;

    @OneToMany(mappedBy = "question", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    Set<MultichoiceDetail> options;
}
