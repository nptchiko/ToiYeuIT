package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "email",
            expression = "java(request.getEmail().toLowerCase())")
    User toUser(UserCreationRequest request);

    @Mapping(target = "role", source = "user.role.name")
    @Mapping(target = "id", source = "user.id")
    UserResponse toUserResponse(User user);
}
