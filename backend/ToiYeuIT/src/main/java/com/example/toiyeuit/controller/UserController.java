package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.admin.AdminUpdateUserRequest;
import com.example.toiyeuit.dto.request.user.UpdateUserRequest;
import com.example.toiyeuit.dto.request.user.UserCreationRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.OverviewResponse;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    public ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest userRequest) {
        var userResponse = userService.createUser(userRequest);

        return ApiResponse.<UserResponse>builder()
                .code(HttpStatus.CREATED.value())
                .message("Created successfully")
                .body(userResponse)
                .build();
    }


    @PutMapping("/{id}")
    public ApiResponse<Void> updateUser(@PathVariable("id") Long id, @RequestBody UpdateUserRequest request){
        userService.updateUser(id,
                AdminUpdateUserRequest.builder()
                        .gender(request.getGender())
                        .username(request.getUsername())
                        .phone(request.getPhone())
                        .build()
                );

        return ApiResponse.<Void>builder()
                .code(200)
                .message("Update user successful")
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