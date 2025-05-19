package com.example.toiyeuit.utils;


import com.example.toiyeuit.enums.PredefinedRole;
import com.example.toiyeuit.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class UserUtils {

    UserService userService;

    public PredefinedRole getCurrentUserRole(){
        var user = userService.getUserByEmail(SecurityUtils.getCurrentUserLogin());
        return PredefinedRole.fromRole(user.getRole());
    }
}
