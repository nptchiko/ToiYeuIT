package com.example.toiyeuit.enums;

import com.example.toiyeuit.exception.InvalidEnumException;

public enum Level {
    BASIC,
    INTERMEDIATE,
    ADVANCE;

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
}
