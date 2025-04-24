package com.example.toiyeuit.utils;

import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SecurityUtils {

    public static String getCurrentUserLogin(){
        SecurityContext context = SecurityContextHolder.getContext();
        return extractPrincipal(context.getAuthentication());

    }
    private static String extractPrincipal(Authentication authentication){
        if (authentication == null)
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        else if (authentication.getPrincipal() instanceof UserDetails userDetails){
            return userDetails.getUsername();
        } else if (authentication.getPrincipal() instanceof  String s){
            return s;
        }
        throw new AppException(ErrorCode.UNAUTHENTICATED);
    }
}
