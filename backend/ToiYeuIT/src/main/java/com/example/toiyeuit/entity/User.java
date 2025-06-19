package com.example.toiyeuit.entity;

import com.example.toiyeuit.entity.course.Enrollment;
import com.example.toiyeuit.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter // auto get
@Setter // auto set
@Builder    // builder pattern
@NoArgsConstructor //constructor ko tham so
@AllArgsConstructor // constructor all tham so
@FieldDefaults(level = AccessLevel.PRIVATE) //EntGetter
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    @Column(nullable = true)
    private String username;

    private String password;

    private String email;

    @Column(columnDefinition = "varchar(32) default 'm'")
    @Enumerated(EnumType.STRING)
    private Gender gender;


    private String phone;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    Set<Enrollment> enrollments;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    Set<FlashcardDeck> flashcardDeck;

    @Column(name = "status")
    private boolean status;

    @PrePersist
    void setStatus(){
        this.status = true;
    }
}
