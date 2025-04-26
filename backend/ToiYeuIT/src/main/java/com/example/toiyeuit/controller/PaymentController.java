package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.OrderCourseRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.OrderCourseResponse;
import com.example.toiyeuit.dto.response.VNPayResponse;
import com.example.toiyeuit.service.payment.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    @GetMapping("/vn-pay")
    public ApiResponse<VNPayResponse> pay(HttpServletRequest request) {
        return ApiResponse.<VNPayResponse>builder()
                .code(HttpStatus.OK.value())
                .body(paymentService.createVnPayPayment(request))
                .message("Success")
                .build();
    }

    @GetMapping("/vn-pay-callback")
    public ApiResponse<VNPayResponse> payCallbackHandler(HttpServletRequest request) {
        String status = request.getParameter("vnp_ResponseCode");
        log.info("Transaction No: " + request.getParameter("vnp_TransactionNo"));
        if (status.equals("00")) {
            return ApiResponse.<VNPayResponse>builder()
                    .code(HttpStatus.OK.value())
                    .body(VNPayResponse.builder().paymentUrl("").build())
                    .message("Success")
                    .build();
        } else {
            return ApiResponse.<VNPayResponse>builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message("Failed")
                    .body(null)
                    .build();
        }
    }

    @PostMapping("/save-order")
    public ApiResponse<OrderCourseResponse> saveCourse(@RequestBody OrderCourseRequest orderCourseRequest) {
        return ApiResponse.<OrderCourseResponse>builder()
                        .code(HttpStatus.CREATED.value())
                .body(paymentService.saveOrder(orderCourseRequest))
                .message("Created")
                .build();
    }
}