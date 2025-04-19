package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
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
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }
///  ADMIN ///
    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ApiResponse.builder()
                .code(HttpStatus.OK.value())
                .build();
    }
    @GetMapping("/{id}")
    public UserResponse getUserByID(@PathVariable("id") Long id){
        var info = userService.getUserById(id);

        return info;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
/// ADMIN ///




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
/// USER ///
}