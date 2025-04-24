package com.example.toiyeuit.entity.course;

import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.enums.CourseStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Slf4j
@Entity
@Table(name = "enrollment")
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    Course course;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", columnDefinition = "enum('COMPLETED', 'PENDING', 'EXPIRED')")
    CourseStatus status;

    @CreationTimestamp
    @Column(name = "enrolled_at")
    LocalDateTime enrolled_at;

    @Column(name = "expired_at")
    LocalDateTime expired_at;

    @PostPersist
    public void postPersist(){
        log.info("Expiration operation");
        if (expired_at == null)
            this.expired_at = LocalDateTime.now().plusWeeks(course.getDuration());
    }
}

