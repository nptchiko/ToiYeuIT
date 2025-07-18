package com.example.toiyeuit.controller.admin;

import com.example.toiyeuit.dto.admin.AdminUpdateUserRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.dto.response.admin.AdminUsersResponse;
import com.example.toiyeuit.mapper.UserMapper;
import com.example.toiyeuit.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminUserController {
    ///  ADMIN ///

    UserService userService;
    UserMapper userMapper;

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ApiResponse.builder()
                .code(HttpStatus.OK.value())
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserByID(@PathVariable("id") Long id){
        var info = userService.getUserById(id);

        return ApiResponse.<UserResponse>builder()
                .code(200)
                .message("Get user info success")
                .body(userMapper.toUserResponse(info))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<Void> updateUser(@PathVariable("id") Long id, @RequestBody AdminUpdateUserRequest request){
        userService.updateUser(id, request);

        return ApiResponse.<Void>builder()
                .code(200)
                .message("Update user successful")
                .build();
    }

    @GetMapping
    @Operation(description = "sortBy dung de sort theo 1 thong tin cua user, sortDir la sort theo tawng hay giam"
    , summary = "format: http://localhost:8081/api/admin/users?\n" +
            "    page={int}&\n" +
            "    size={{int)}}&\n" +
            "    sortBy={{int}}&\n" +
            "    sortDir={{int}}")
    public ApiResponse<AdminUsersResponse> getAllUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(required = false, defaultValue = "id") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String sortDir
            ) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        return ApiResponse.<AdminUsersResponse>builder()
                .code(200)
                .message("All available users")
                .body(userService.getAllUsers(pageable))
                .build();
    }

}
