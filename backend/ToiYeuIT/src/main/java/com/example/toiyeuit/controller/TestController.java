package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.TestDetailRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.service.TestService;
import jakarta.persistence.FieldResult;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tests")
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class TestController {

    TestService testService;

    @GetMapping("/detail/{id}")
    public ApiResponse<Test> testByID(@PathVariable("id") Long id){
        var result = testService.getByID(id);

        return ApiResponse.<Test>builder()
                .code(200)
                .message("Successfully")
                .body(result)
                .build();
    }
   @GetMapping("/detail/part/{part}")
    public ApiResponse<Test> getTestDetailByPart(@PathVariable("part") int part, @RequestBody TestDetailRequest request){
        return null;

   }
//    @GetMapping("/{id}/part/{part}")
//    public ApiResponse<Test>
}
