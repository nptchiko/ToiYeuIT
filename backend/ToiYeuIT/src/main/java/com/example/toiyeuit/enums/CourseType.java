package com.example.toiyeuit.enums;

import lombok.Getter;

@Getter
public enum CourseType {
    LR("Listening - Reading"),
    SW("Speaking - Writing")
    ;

    private final String name;

    CourseType(String name) {
        this.name = name;
    }
}
