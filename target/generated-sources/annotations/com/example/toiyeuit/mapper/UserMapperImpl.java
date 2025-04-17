package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.UserResponseDTO;
import com.example.toiyeuit.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-12T22:20:35+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        return user;
    }

    @Override
    public UserResponseDTO toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        return userResponseDTO;
    }
}
