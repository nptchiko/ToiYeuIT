package com.example.toiyeuit.entity.course;

import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.entity.key.OrderKey;
import com.example.toiyeuit.enums.PaymentMethod;
import com.example.toiyeuit.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //E
@Table(name = "order_course")
public class CourseOrder {
    @EmbeddedId
    OrderKey id;

    @ManyToOne
    @MapsId(value = "user_id")
    @JoinColumn(name = "user_id")
    User user;


    @ManyToOne
    @MapsId(value = "course_id")
    @JoinColumn(name = "course_id")
    Course course;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", columnDefinition = "varchar(32) default 'PENDING'")
    PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, columnDefinition = "varchar(32) default 'VNPAY'")
    PaymentMethod paymentMethod = PaymentMethod.VNPAY;

}

