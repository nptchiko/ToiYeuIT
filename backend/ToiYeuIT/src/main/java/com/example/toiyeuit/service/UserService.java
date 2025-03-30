package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.UserCreationRequest;
import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.UserAlreadyExistsException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.RoleRepository;
import com.example.toiyeuit.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserCreationRequest> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserCreationRequest getUserById(long id) throws ResourceNotFoundException {
        User u = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return convertToDto(u);
    }

    public UserCreationRequest getUserByEmail(String email) throws ResourceNotFoundException {
         User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return convertToDto(u);
    }

    public Boolean existsByEmail(String email) throws ResourceNotFoundException {
        return userRepository.existsByEmail(email);
    }

    public Boolean existsByUsername(String username) throws ResourceNotFoundException {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public UserCreationRequest createUser(UserCreationRequest userCreationRequest) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(userCreationRequest.getEmail().toLowerCase())) {
            throw new UserAlreadyExistsException();
        }

        if (userRepository.existsByUsername(userCreationRequest.getUsername().toLowerCase())) {
            throw new UserAlreadyExistsException();
        }

        // get role from roleName, default to USER if not found
      //  Role userRole = roleRepository.findByName(userCreationRequest.getRoleName())
        //        .orElseGet(() -> roleRepository.findByName("USER")
        //                .orElseThrow(() -> new ResourceNotFoundException("Default role not found")));
        Optional<Role> userRole = roleRepository.findByName("USER");
        User user = User.builder()
                        .username(userCreationRequest.getUsername())
                        .email(userCreationRequest.getEmail())
                        .password(passwordEncoder.encode(userCreationRequest.getPassword()))
                        .phone(userCreationRequest.getPhone())
                        .gender(userCreationRequest.getGender())
                        .role(userRole.get())
                .build();

        user.setEmail(user.getEmail().toLowerCase());
        try {
            return convertToDto(userRepository.save(user));
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new RuntimeException("Something went wrong when creating user");
        }
    }

    @Transactional
    public void deleteUser(long id) throws ResourceNotFoundException {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
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

    private UserCreationRequest convertToDto(User user) {
        return UserCreationRequest.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .gender(user.getGender())
                .phone(user.getPhone())

                .build();
    }
}
