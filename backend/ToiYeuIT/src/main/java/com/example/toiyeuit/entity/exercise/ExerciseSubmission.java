package com.example.toiyeuit.entity.exercise;

import com.example.toiyeuit.entity.User;
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
@Table(name = "exercise_submission")
public class ExerciseSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submission_id")
    Long id;

    @OneToOne()
    @JoinColumn(
            name = "ex_id"
    )
    Exercise exercise;

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
