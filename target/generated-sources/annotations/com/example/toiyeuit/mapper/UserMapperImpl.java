package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.admin.AdminUpdateUserRequest;
import com.example.toiyeuit.dto.request.user.UserCreationRequest;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-19T18:59:17+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class UserMapperImpl extends UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        if ( request.getUsername() != null ) {
            user.username( request.getUsername() );
        }
        else {
            user.username( "Unknown" );
        }
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

        userResponse.status( user.isStatus() ? "ACTIVE" : "INACTIVE" );

        return userResponse.build();
    }

    @Override
    public void updateUser(User user, AdminUpdateUserRequest request) {
        if ( request == null ) {
            return;
        }

        if ( request.getRole() != null ) {
            user.setRole( convertRole( request.getRole() ) );
        }
        user.setStatus( request.isStatus() );
        if ( request.getUsername() != null ) {
            user.setUsername( request.getUsername() );
        }
        if ( request.getGender() != null ) {
            user.setGender( request.getGender() );
        }
        if ( request.getPhone() != null ) {
            user.setPhone( request.getPhone() );
        }
    }

    private String userRoleName(User user) {
        Role role = user.getRole();
        if ( role == null ) {
            return null;
        }
        return role.getName();
    }
}
