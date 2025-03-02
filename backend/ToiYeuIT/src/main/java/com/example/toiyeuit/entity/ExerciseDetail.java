package com.example.toiyeuit.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //E
@Table(name = "exercise_detail")
// có thể dùng khóa phức nhưng dài ko làm
public class ExerciseDetail {
    @EmbeddedId
    ExerciseKey id;

    @ManyToOne
    @JoinColumn(name = "ex_id")
    @MapsId(value = "exercise_id")
    Exercise excerise;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @MapsId(value = "question_id")
    Question question;

    @Column(nullable = false)
    int index;
}

@Getter
@Setter
@Embeddable
@FieldDefaults(level = AccessLevel.PRIVATE)
class ExerciseKey implements Serializable {
    Integer exercise_id;
    Long question_id;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ExerciseKey that = (ExerciseKey) o;
        return Objects.equals(exercise_id, that.exercise_id) && Objects.equals(question_id, that.question_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(exercise_id, question_id);
    }
}
