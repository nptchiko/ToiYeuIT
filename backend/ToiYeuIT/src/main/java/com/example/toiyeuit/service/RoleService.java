package com.example.toiyeuit.service;


import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.enums.PredefinedRole;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {

    private final RoleRepository roleRepository;

    public Role findRoleByName(PredefinedRole role){
        return roleRepository.findByName(role.name())
                .orElseThrow(()-> new AppException(ErrorCode.ROLE_NOT_FOUND));
    }
}
