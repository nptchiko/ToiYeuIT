package com.example.toiyeuit.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


// add more!
@Getter
public enum ErrorCode {
    USER_EXISTED(4000, "User existed", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(4010, "You need to log in to perform this action.", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(4030, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_CREDENTIALS(4001, "Invalid credentials, please try again.", HttpStatus.BAD_REQUEST),
    EXPIRED_TOKEN(4011, "Expired token. Please refresh the new one", HttpStatus.UNAUTHORIZED),
    RESOURCE_NOT_FOUND(4040, "Resource not found", HttpStatus.NOT_FOUND),
    USER_NOT_FOUND(4041, "User not found", HttpStatus.NOT_FOUND),
    INVALID_TOKEN(4002, "Invalid token. The token has been tampered or excluded", HttpStatus.BAD_REQUEST)
    ;
    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode){
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
