package com.example.toiyeuit.entity;

import com.example.toiyeuit.enums.QuestionScope;
import jakarta.persistence.*;

@Entity
@Table(name="question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ques_id")
    private Integer id;

    private String description;

    private String questionType;

    private QuestionScope questionScope;

    @Column(name="correct_ans")
    private String answer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public QuestionScope getQuestionScope() {
        return questionScope;
    }

    public void setQuestionScope(QuestionScope questionScope) {
        this.questionScope = questionScope;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
