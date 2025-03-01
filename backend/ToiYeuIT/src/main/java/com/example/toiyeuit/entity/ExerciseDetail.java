package com.example.toiyeuit.entity;

import jakarta.persistence.*;

@Entity
@Table(name="exercise_detail")
public class ExerciseDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ManyToOne
    @JoinColumn(name="ex_id")
    private Exercise id;

    @ManyToOne
    @JoinColumn(name="question_id")
    private Question question;

    private Integer index;

    public Exercise getId() {
        return id;
    }

    public void setId(Exercise id) {
        this.id = id;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
