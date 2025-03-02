 package com.example.toiyeuit.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //E
@Table(name = "test_submission")
public class TestSubmision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submission_id")
    Long id;

    @OneToOne()
    @JoinColumn(
            name = "test_id"
    )
    Test test;

    @OneToOne
    @JoinColumn(
            name = "last_answered_by"
    )
    User user;

    @CurrentTimestamp
    LocalDateTime last_answered_at;

    @Column(name = "score")
    Float score;
}
