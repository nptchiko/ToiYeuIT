package com.example.toiyeuit.entity.exercise;

import com.example.toiyeuit.entity.lesson.Lesson;
import com.example.toiyeuit.entity.question.Question;
import com.example.toiyeuit.enums.QuestionType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //Entity
@Table(name="exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="lesson_id",
        referencedColumnName = "lesson_id"
    )
    private Lesson lesson;

    private String instruction;

    private String content;

    private String mediaUrl;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "exercise_detail",
            joinColumns = @JoinColumn(name = "ex_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    Set<Question> questions;
}
