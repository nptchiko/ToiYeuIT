package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.UserResponseDTO;
import com.example.toiyeuit.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping
//    public ResponseEntity<List<UserCreationRequest>> getAllUsers() {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<UserCreationRequest> getUserById(@PathVariable Long id) {
//        try {
//            return ResponseEntity.ok(userService.getUserById(id));
//        } catch (Exception e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//

    @PostMapping("/create-user")
    public ApiResponse<UserResponseDTO> createUser(@RequestBody UserCreationRequest userCreationRequest) {
        var userResponse = userService.createUser(userCreationRequest);

        return ApiResponse.<UserResponseDTO>builder()
                .code(HttpStatus.CREATED.value())
                .message("Created successfully")
                .body(userResponse)
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
