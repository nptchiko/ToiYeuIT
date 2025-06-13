package com.example.toiyeuit.enums;

import com.example.toiyeuit.entity.Role;

public enum PredefinedRole {
    ADMIN, USER, STUDENT;

    public static PredefinedRole fromRole(Role role){
        return fromString(role.getName());
    }

    public static PredefinedRole fromString(String role){
        for( var r : PredefinedRole.values())
            if (role.toUpperCase().equals(r.name()))
                return r;
        return null;
    }
}
