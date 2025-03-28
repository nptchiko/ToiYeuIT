package com.example.toiyeuit.enums;

public enum Gender {
    m,
    f;

    public static Gender fromString(String gender) {
        if (gender.equalsIgnoreCase("female") || gender.equalsIgnoreCase("f")) {
            return f;
        }

        return m;
    }
}
