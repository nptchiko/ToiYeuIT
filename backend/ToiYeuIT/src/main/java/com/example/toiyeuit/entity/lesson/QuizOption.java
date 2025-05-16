package com.example.toiyeuit.entity.lesson;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "quiz_option")
public class QuizOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    Long id;

    @Column(name = "option_text", nullable = false, columnDefinition = "TEXT")
    String optionText;

    @Column(name = "is_correct")
    Boolean isCorrect = false;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "grammar_quiz_id", nullable = false)
    GrammarQuiz question;

    @OneToMany(mappedBy = "selectedOption", cascade = CascadeType.ALL)
    Set<QuizUserSubmission> quizUserSubmissions;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}