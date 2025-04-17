package com.example.toiyeuit.entity;

import com.example.toiyeuit.enums.CourseType;
import com.example.toiyeuit.enums.Level;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;
import java.math.BigDecimal;

import lombok.*;
@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //Entity
@Table(name="course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="course_id")
    private Integer id;

    @Column(length = 100)
    private String title;

    private String description;

    @Enumerated(value = EnumType.STRING)
    private Level level = Level.BASIC;

    @Column(columnDefinition = "DECIMAL(10,2) NOT NULL")
    private Double price;

    private Boolean enabled;

    private Integer duration;

    @Column(name = "tag")
    private String tag;

    @Enumerated(value = EnumType.STRING)
    private CourseType type;

}
