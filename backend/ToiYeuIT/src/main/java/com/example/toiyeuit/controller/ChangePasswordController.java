package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.ChangePasswordRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.service.ChangePasswordService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/auth")
public class ChangePasswordController {

        ChangePasswordService changePasswordService;

        @PutMapping("/reset-password")
        ApiResponse<?> changePassword(@RequestBody @Valid ChangePasswordRequest request){
                changePasswordService.changePassword(request);
                return ApiResponse.builder()
                        .code(200)
                        .message("Password changed successfully")
                        .build();
        }
}
