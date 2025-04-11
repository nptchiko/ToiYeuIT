package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.UserResponseDTO;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.enums.Gender;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Service;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "email",
            expression = "java(request.getEmail().toLowerCase())")
    User toUser(UserCreationRequest request);

    @Mapping(target = "role", source = "user.role.name")
    UserResponseDTO toUserResponse(User user);
}
