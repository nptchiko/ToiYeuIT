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
@Table(name = "test_result")
public class TestResult {
    @EmbeddedId
    TResultKey id;

    @MapsId(value = "test_id")
    @ManyToOne
    @JoinColumn(name = "id")
    TestSubmission testSubmission;

    @MapsId(value = "ques_id")
    @ManyToOne
    @JoinColumn(name = "question_id")
    Question question;

    @Column(length = 30, nullable = false)
    String answer;

    @Column(length = 30, name = "correct_ans", nullable = false)
    String correct_ans;
}

@Getter
@Setter
@Embeddable
@FieldDefaults(level = AccessLevel.PRIVATE)
class TResultKey implements Serializable {
    Long test_id;
    Long ques_id;
}
