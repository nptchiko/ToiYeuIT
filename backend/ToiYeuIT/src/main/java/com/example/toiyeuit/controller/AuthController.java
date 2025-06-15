package com.example.toiyeuit.controller;


import com.example.toiyeuit.dto.request.ChangePasswordRequest;
import com.example.toiyeuit.dto.request.LoginRequest;
import com.example.toiyeuit.dto.request.LogoutRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.AuthTokenResponse;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.service.AuthService;
import com.example.toiyeuit.service.ChangePasswordService;
import com.example.toiyeuit.service.EmailService;
import com.example.toiyeuit.service.UserService;
import com.nimbusds.jose.JOSEException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Collections;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("api/auth/")
public class AuthController {

    AuthService authService;
    UserService userService;
    EmailService emailService;
    ChangePasswordService changePasswordService;


    // LOGIN WITH OAUTH2
/*
    @PostMapping("/login/google")
    public ApiResponse<AuthTokenResponse> googleAuthenticate(@RequestParam("code") String code){
        var result = authService.authenticate(code, response);

        return null;
    }
*/


    @PostMapping("/login")
    public ApiResponse<AuthTokenResponse> login(@RequestBody LoginRequest request, HttpServletResponse response){
        var result = authService.authenticate(request, response);

        return ApiResponse.<AuthTokenResponse>builder()
                .code(HttpStatus.CREATED.value())
                .body(result)
                .message("Authenticated successfully")
                .build();
    }

    @PostMapping("/login/{provider}")
    public ApiResponse<AuthTokenResponse> outboundLogin(@RequestParam("code") String code,
                                                        @PathVariable("provider") String provider,
                                                        HttpServletResponse response){
        var result = authService.outboundAuthentication(provider, code, response);

        return ApiResponse.<AuthTokenResponse>builder()
                .code(HttpStatus.CREATED.value())
                .body(result)
                .message("Authenticated successfully")
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<?> logout(@Valid @RequestBody LogoutRequest logoutRequest) throws ParseException, JOSEException {
       var result = authService.logout(logoutRequest);

       return ApiResponse.builder()
               .code(200)
               .message(result)
               .build();
    }

    @PostMapping("/forgot-password")
    public ApiResponse<?> forgotPassword(@RequestParam("email") String email){
        var token = authService.forgetPassword(email);
        return ApiResponse.builder()
                .code(200)
                .body(Collections.singletonMap("verify-token", token))
                .message("A confirmation code is sent to email: " + email)
                .build();
    }

    @Operation(
            description = "set oldPassword to null if requesting forget-password"
    )
    @PutMapping("/reset-password")
    ApiResponse<?> changePassword(@RequestBody @Valid ChangePasswordRequest request){
        changePasswordService.changePassword(request);
        return ApiResponse.builder()
                .code(200)
                .message("Password changed successfully")
                .build();
    }
}
