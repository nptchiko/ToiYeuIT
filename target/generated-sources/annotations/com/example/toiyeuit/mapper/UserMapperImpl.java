package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-25T15:57:07+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.username( request.getUsername() );
        user.password( request.getPassword() );
        user.gender( request.getGender() );
        user.phone( request.getPhone() );

        user.email( request.getEmail().toLowerCase() );

        return user.build();
    }

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.role( userRoleName( user ) );
        userResponse.id( user.getId() );
        userResponse.username( user.getUsername() );
        userResponse.email( user.getEmail() );
        userResponse.phone( user.getPhone() );
        if ( user.getGender() != null ) {
            userResponse.gender( user.getGender().name() );
        }

        return userResponse.build();
    }

    private String userRoleName(User user) {
        Role role = user.getRole();
        if ( role == null ) {
            return null;
        }
        return role.getName();
    }
}
