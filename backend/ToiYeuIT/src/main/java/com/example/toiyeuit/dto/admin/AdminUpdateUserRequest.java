package com.example.toiyeuit.dto.admin;

import com.example.toiyeuit.enums.Gender;
import com.example.toiyeuit.enums.PredefinedRole;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminUpdateUserRequest {
    private String username;
    private PredefinedRole role;
    private boolean status;
    private Gender gender;
    private String phone;
}
