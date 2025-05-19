package com.example.toiyeuit.controller.admin;

import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
public class AdminUserController {
    ///  ADMIN ///

    UserService userService;

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

/*
    @GetMapping
    @Operation(description = "sortBy is used for sorting based on user info\nsortDir is sort tang dan or giam dan")
    public ApiResponse<List<Course>> getAllCourses(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(required = false, defaultValue = "id") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir
            ) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<UserResponse> user = userService.getAllUsers(pageable);

        return ApiResponse.<List<Course>>builder()
                .code(200)
                .message("All available course")
                .body(course.getContent())
                .build();
    }
/*/// ADMIN ///

}
