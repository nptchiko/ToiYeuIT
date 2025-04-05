package com.example.toiyeuit.enums;

public enum QuestionType {
    MULTICHOICE,
    FILLING_BLANK;

    public static QuestionType fromString(String questionType) {
        return switch (questionType) {
            case "MULTICHOICE" -> MULTICHOICE;
            case "FILLING_BLANK" -> FILLING_BLANK;
            default -> MULTICHOICE;
        };
    }
}
