package com.example.toiyeuit.entity.test;

import com.example.toiyeuit.entity.question.Question;
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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne
    @JoinColumn(name = "submit_id")
    TestSubmission testSubmission;


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "question_id")
    Question question;

    @Column(length = 150, nullable = false)
    String answer;

    int part;
}

