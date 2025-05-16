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
@Table(name = "grammar")
public class Grammar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grammar_id")
    Long id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    String content;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "lesson_id", unique = true, nullable = false)
    Lesson lesson;

    @OneToMany(mappedBy = "grammar", cascade = CascadeType.ALL)
    Set<GrammarQuiz> quizQuestions;

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
