package com.example.toiyeuit.enums;

import com.example.toiyeuit.exception.InvalidEnumException;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.Setter;

@Getter
public enum Level {
    BASIC("Cơ bản"),
    INTERMEDIATE("Trung cấp"),
    ADVANCED("Nâng cao");

    public static Level fromString(String value) {
        if (value != null) {
            try {
                return Level.valueOf(value.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new InvalidEnumException("Invalid enum value: " + value);
            }
        }

        return Level.BASIC;
    }
    Level(String name){
        this.name = name;
    }
    private final String name;

    @JsonValue
    public String getName(){
        return this.name;
    }
}
