package com.example.toiyeuit.dto.request;

import com.example.toiyeuit.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationRequest {
    private String username;
    private String email;
    private String password;
    private Gender gender;
    private String phone;
}
