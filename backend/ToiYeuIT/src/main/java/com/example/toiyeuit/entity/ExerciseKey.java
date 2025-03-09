package com.example.toiyeuit.entity;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExerciseKey implements Serializable {
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
