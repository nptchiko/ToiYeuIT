package com.example.toiyeuit.entity.lesson;

import com.example.toiyeuit.entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "user_answer")
public class QuizUserSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    Long id;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    User user;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    GrammarQuiz question;

    @ManyToOne
    @JoinColumn(name = "selected_option_id")
    QuizOption selectedOption;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Add unique constraint for user_id and question_id
    @Table(uniqueConstraints = {
        @UniqueConstraint(name = "uk_user_question", columnNames = {"user_id", "question_id"})
    })
    public static class Constraints {}
}
