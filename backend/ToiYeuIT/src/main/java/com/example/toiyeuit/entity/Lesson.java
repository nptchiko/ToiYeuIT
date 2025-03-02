package com.example.toiyeuit.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name="lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="lesson_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name="course_id")
    private Course course;

    private String title;

    private String videoUrl;

    private String imageUrl;

    private String description;

    @ManyToOne
    @JoinColumn(name="skill_id")
    private Skill skill;

}
