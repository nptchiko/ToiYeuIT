package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.OverviewResponse;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.service.UserService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserService userService;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
    }




/// USER ///
    @PostMapping("/create-user")
    public ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest userCreationRequest) {
        var userResponse = userService.createUser(userCreationRequest);

        return ApiResponse.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Created successfully")
                .body(userResponse)
                .build();
    }

    @GetMapping("/user-info")
    public ApiResponse<UserResponse> info() {
        return ApiResponse.<UserResponse>builder()
                .message("User information")
                .code(200)
                .body(userService.getInfo())
                .build();
    }
    @GetMapping("/overview")
    public ApiResponse<OverviewResponse> overview() {
        return ApiResponse.<OverviewResponse>builder()
                .message("Overview")
                .code(200)
                .body(userService.getOverviewInfo())
                .build();
    }
/// USER ///
}