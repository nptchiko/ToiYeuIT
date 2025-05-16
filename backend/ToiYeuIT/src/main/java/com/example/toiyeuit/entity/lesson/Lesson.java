package com.example.toiyeuit.entity.lesson;
import com.example.toiyeuit.entity.course.Course;
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
@Table(name = "lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_id")
    Long id;

    @Column(nullable = false)
    String title;

    String description;

    Integer sections;

    @Column(name = "is_submitted")
    Boolean isSubmitted = false;

    @Column(name = "order_index", nullable = false)
    Integer orderIndex;

    @Column(name = "video_url")
    String videoUrl;

    @Column(name = "materials_url")
    String materialsUrl;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    Course course;

    @OneToOne(mappedBy = "lesson", cascade = CascadeType.ALL)
    Grammar grammar;

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
