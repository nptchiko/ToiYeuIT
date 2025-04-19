package com.example.toiyeuit.enums;

import com.example.toiyeuit.exception.AppException;

public enum Gender {
    m,
    f;

    public static Gender fromString(String g) {

        if (g.equalsIgnoreCase("female") || g.equalsIgnoreCase("f"))
            return f;
        return m;
    }
}
