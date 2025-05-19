package com.example.toiyeuit.controller.admin;


import com.example.toiyeuit.dto.admin.AdminTestResponse;
import com.example.toiyeuit.dto.admin.test.TestCreationRequest;
import com.example.toiyeuit.dto.admin.TestSetCreationRequest;
import com.example.toiyeuit.dto.admin.UpdateTestRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.service.admin.AdminTestService;
import com.example.toiyeuit.service.test.TestCollectionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tests")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminTestController {

    AdminTestService adminTestService;
    private final TestCollectionService testCollectionService;

    @GetMapping
    public ApiResponse<java.util.List<AdminTestResponse>> getAllTest(
            @RequestParam("page") int page,
            @RequestParam("size") int size
    ){
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<AdminTestResponse> tests = adminTestService.getAllTests(pageable);

        return ApiResponse.<List<AdminTestResponse>>builder()
                .code(200)
                .message("All tests")
                .body(tests.getContent())
                .build();
    }
    @PostMapping("/test")
    public ApiResponse<TestResponse> addTest(@RequestBody TestCreationRequest request){
        adminTestService.saveTest(request);
        return ApiResponse.<TestResponse>builder()
                .code(200)
                .message("Successfully")
                .build();

    }

    @PutMapping("/test")
    public ApiResponse<Void> updateTest(@RequestBody UpdateTestRequest request){
        adminTestService.updateTest(request);

        return ApiResponse.<Void>builder()
                .code(200)
                .message("Update done")
                .build();
    }
    @DeleteMapping("/test/{id}")
    public ApiResponse<Void> deleteTest(@PathVariable("id") long id){

        adminTestService.deleteTest(id);

        return ApiResponse.<Void>builder()
                .code(200)
                .message("Update done")
                .build();
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteTestSet(@PathVariable("id") long id){
        adminTestService.deleteTestSet(id);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Delete test set okay!")
                .build();
    }
    @PostMapping
    public ApiResponse<TestSetResponse> addNewTestSet(@RequestBody TestSetCreationRequest request){
        return ApiResponse.<TestSetResponse>builder()
                .message("Add new test set okay!")
                .code(200)
                .body(adminTestService.saveTestSet(request))
                .build();
    }
}
