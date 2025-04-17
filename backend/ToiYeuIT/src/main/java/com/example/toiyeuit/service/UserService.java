package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.exception.UserAlreadyExistsException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.mapper.UserMapper;
import com.example.toiyeuit.repository.RoleRepository;
import com.example.toiyeuit.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;

    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(long id){
        return userMapper.toUserResponse(
                userRepository.findById(id).orElseThrow(
                        () -> new AppException(ErrorCode.USER_NOT_FOUND)
                )
        );
    }

    public UserResponse getInfo(){
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        return getUserByEmail(email);
    }

    public UserResponse getUserByEmail(String email){
         User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toUserResponse(u);
    }

    public Boolean existsByEmail(String email) throws ResourceNotFoundException {
        return userRepository.existsByEmail(email);
    }

    public Boolean existsByUsername(String username) throws ResourceNotFoundException {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public UserResponse createUser(UserCreationRequest userCreationRequest) throws UserAlreadyExistsException {

        if (userRepository.existsByEmail(userCreationRequest.getEmail().toLowerCase()))
            throw new AppException(ErrorCode.USER_EMAIL_EXISTED);
        if (userRepository.existsUserByPhone(userCreationRequest.getPhone()))
            throw new AppException(ErrorCode.USER_PHONE_EXISTED);

        // get role from roleName, default to USER if not found
      //  Role userRole = roleRepository.findByName(userCreationRequest.getRoleName())
        //        .orElseGet(() -> roleRepository.findByName("USER")
        //                .orElseThrow(() -> new ResourceNotFoundException("Default role not found")));
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

        User user = userMapper.toUser(userCreationRequest);
        user.setRole(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setEmail(user.getEmail().toLowerCase());
        logger.info("[service.UserService]: email: " + user.getEmail());

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        userRepository.deleteById(id);
    }

    @Transactional
    public void changePassword(long id, String newPassword) throws ResourceNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
