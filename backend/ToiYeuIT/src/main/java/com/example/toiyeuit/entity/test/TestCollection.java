package com.example.toiyeuit.entity.test;

import com.example.toiyeuit.entity.Skill;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "test_collection")
public class TestCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "title")
    String title;

    @Column(name = "description")
    String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id")
    Skill skill;

    @OneToMany(mappedBy = "testCollection", cascade = CascadeType.ALL)
    Set<Test> tests;
}
