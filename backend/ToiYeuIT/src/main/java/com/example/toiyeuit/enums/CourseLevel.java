package com.example.toiyeuit.enums;

import com.example.toiyeuit.exception.InvalidEnumException;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

@Getter
public enum CourseLevel {
    BASIC("Cơ bản"),
    INTERMEDIATE("Trung cấp"),
    ADVANCED("Nâng cao");

    public static CourseLevel fromString(String value) {
        if (value != null) {
            try {
                return CourseLevel.valueOf(value.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new InvalidEnumException("Invalid enum value: " + value);
            }
        }
        return CourseLevel.BASIC;
    }
    CourseLevel(String name){
        this.name = name;
    }
    private final String name;

    @JsonValue
    public String getName(){
        return this.name;
    }
}
