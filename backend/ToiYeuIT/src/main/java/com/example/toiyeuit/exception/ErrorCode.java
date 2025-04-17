package com.example.toiyeuit.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;


// add more!
@Getter
public enum ErrorCode {
    // exist and invalid - 400
    USER_EXISTED(4000, "User existed", HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(4001, "Invalid credentials, please try again.", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN(4002, "Invalid token. The token has been tampered or excluded", HttpStatus.BAD_REQUEST),
    USER_EMAIL_EXISTED(4003, "User with this email existed", HttpStatus.BAD_REQUEST),
    USER_PHONE_EXISTED(4004, "User with this phone number existed", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL_DELIVERY(4005, "Failed to send email", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(4006, "Email is not validated", HttpStatus.BAD_REQUEST),
    PASS_EXISTED(4007, "New password can not be same with old password", HttpStatus.BAD_REQUEST),
    INVALID_CONFIRM_LOGIC(4008, "Your confirmation password is wrong", HttpStatus.BAD_REQUEST),
    // unauthenticated - 401
    UNAUTHENTICATED(4010, "You need to log in to perform this action.", HttpStatus.UNAUTHORIZED),
    EXPIRED_TOKEN(4011, "Expired token. Please refresh the new one", HttpStatus.UNAUTHORIZED),

    //  unauthorized - 403
    UNAUTHORIZED(4030, "You do not have permission", HttpStatus.FORBIDDEN),

    //not found - 404
    RESOURCE_NOT_FOUND(4040, "No static resource found, check your path carefully!", HttpStatus.NOT_FOUND),
    USER_NOT_FOUND(4041, "User not found", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(4042, "Role not found", HttpStatus.NOT_FOUND),
    SKILL_NOT_FOUND(4043, "Skill not found", HttpStatus.NOT_FOUND),
    TEST_NOT_FOUND(4044, "Test not found", HttpStatus.NOT_FOUND),
    VERIFYING_TOKEN_NOT_FOUND(4045, "Verification token is not found", HttpStatus.NOT_FOUND);
    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode){
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
