package com.example.toiyeuit.entity;

import com.example.toiyeuit.enums.CourseStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;


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
    EnrollmentKey id;

    @ManyToOne
    @MapsId(value = "user_id")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId(value = "course_id")
    @JoinColumn(name = "course_id")
    Course course;

    @Enumerated(value = EnumType.ORDINAL)
    @Column(name = "status")
    CourseStatus status;

    @CreationTimestamp
    @Column(name = "enrolled_at")
    LocalDateTime enrolled_at;

    @Column(name = "expired_at")
    LocalDateTime expired_at;
}
@Getter
@Setter
@Embeddable
@FieldDefaults(level = AccessLevel.PRIVATE)
class EnrollmentKey implements Serializable {
    Integer course_id;
    Long user_id;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        EnrollmentKey that = (EnrollmentKey) o;
        return Objects.equals(course_id, that.course_id) && Objects.equals(user_id, that.user_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(course_id, user_id);
    }
}

