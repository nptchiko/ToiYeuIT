package com.example.toiyeuit.enums;

public enum PaymentStatus {
    PENDING,
    PAID,
    CANCELLED;

    public static PaymentStatus fromString(String ps) {
        if (ps.equalsIgnoreCase("PENDING"))
            return PENDING;
        if (ps.equalsIgnoreCase("PAID"))
            return PAID;
        return CANCELLED;
    }
}
