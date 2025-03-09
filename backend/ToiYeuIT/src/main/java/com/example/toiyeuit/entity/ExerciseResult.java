package com.example.toiyeuit.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //Entity
@Table(name = "exercise_result")
public class ExerciseResult {
    @EmbeddedId
    ResultKey id;

    @MapsId(value = "submit_id")
    @ManyToOne
    @JoinColumn(name = "id")
    ExerciseSubmission exerciseSubmission;

    @MapsId(value = "ques_id")
    @ManyToOne
    @JoinColumn(name = "ques_id")
    Question question;

    @Column(length = 30, nullable = false)
    String answer;

    @Column(length = 30, name = "correct_ans", nullable = false)
    String correct_ans;
}

