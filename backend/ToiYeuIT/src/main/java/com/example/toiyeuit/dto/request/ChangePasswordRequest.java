package com.example.toiyeuit.dto.request;


import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChangePasswordRequest {

    String email;


    String oldPassword;

    @Size(min = 5,message = "Minium password length is 5")
    String newPassword;

    @NotBlank(message = "Confirm password is required")
    String confirmPassword;

}