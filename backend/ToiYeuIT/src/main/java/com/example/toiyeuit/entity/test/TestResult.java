package com.example.toiyeuit.entity.test;

import com.example.toiyeuit.entity.Question;
import com.example.toiyeuit.entity.key.TResultKey;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
    @JoinColumn(name = "submit_id")
    TestSubmission testSubmission;

    @MapsId(value = "ques_id")
    @ManyToOne
    @JoinColumn(name = "question_id")
    Question question;

    @Column(length = 30, nullable = false)
    String answer;

}

