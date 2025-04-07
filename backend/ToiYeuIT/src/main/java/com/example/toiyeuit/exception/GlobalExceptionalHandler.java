package com.example.toiyeuit.exception;


import com.example.toiyeuit.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;


// Auto bat exception roi tra ve client, khong can den try catch
@Slf4j
@ControllerAdvice
public class GlobalExceptionalHandler {
    // too broad exception -- this class should be in handler directory too1
//    @ExceptionHandler(value = Exception.class)
//    ResponseEntity<?> handlingGeneralException(Exception ex){
//        log.error(ex.getMessage());
//        return ResponseEntity.badRequest().body(ex.getMessage());
//    }

    @ExceptionHandler(value = AppException.class)
    ApiResponse<?> handlingAppException(AppException e){
        log.error(e.getMessage(), e);
        ErrorCode errorCode = e.getErrorCode();

        return ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ApiResponse<?> handlingAccessDeniedException(AccessDeniedException e)
    {
        log.error(e.getMessage());
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

        return ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
    }
}
