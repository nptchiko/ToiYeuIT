package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.request.user.UpdateUserRequest;
import com.example.toiyeuit.dto.request.user.UserCreationRequest;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.enums.PredefinedRole;
import com.example.toiyeuit.repository.RoleRepository;
import com.example.toiyeuit.service.RoleService;
import com.example.toiyeuit.service.UserService;
import jdk.jfr.Name;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.mapstruct.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Mapper(componentModel = "spring"
)
public abstract class UserMapper {

    private static final Logger log = LoggerFactory.getLogger(UserMapper.class);
    @Autowired
    protected RoleService roleService;

    @Mapping(target = "email",
            expression = "java(request.getEmail().toLowerCase())")
    @Mapping(target = "username", source = "username", defaultValue = "Unknown")
    public abstract User toUser(UserCreationRequest request);

    @Mapping(target = "role", source = "user.role.name")
    @Mapping(target = "id", source = "user.id")
    public abstract UserResponse toUserResponse(User user);

    @Mapping(target = "role", source = "role", qualifiedByName = "convertRole")
    @Mapping(target = "status", source = "status")
    public abstract void updateUser(@MappingTarget User user, UpdateUserRequest request);

    @Named("convertRole")
    protected Role convertRole(PredefinedRole role){
        log.info("[UserMapper.class] Debug inside convertRole");
        return roleService.findRoleByName(role);
    }
}
