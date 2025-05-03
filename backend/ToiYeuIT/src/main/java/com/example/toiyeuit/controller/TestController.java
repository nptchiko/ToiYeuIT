package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.TestDetailRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.TestDetailsResponse;
import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.service.test.TestService;
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

    @GetMapping("/detail")
    public ApiResponse<TestDetailsResponse> testByID(@RequestParam("id") Long id){
        var result = testService.getTestByID(id);

        return ApiResponse.<TestDetailsResponse>builder()
                .code(200)
                .message("Successfully")
                .body(result)
                .build();
    }
   @GetMapping("/detail/part")
    public ApiResponse<Test> getTestDetailByPart(@RequestParam("part") int part, @RequestBody TestDetailRequest request){
        return null;

   }

//    @GetMapping("/{id}/part/{part}")
//    public ApiResponse<Test>
}
