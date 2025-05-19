package com.example.toiyeuit.service;

import com.example.toiyeuit.dto.request.user.UpdateUserRequest;
import com.example.toiyeuit.dto.request.user.UserCreationRequest;
import com.example.toiyeuit.dto.response.OverviewResponse;
import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.dto.response.UserResponse;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.enums.PredefinedRole;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.exception.UserAlreadyExistsException;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.mapper.UserMapper;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.repository.TestRepository;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserRepository userRepository;
    RoleService roleService;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;
    TestRepository testRepository;
    CourseRepository courseRepository;

    public List<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .stream().map(userMapper::toUserResponse)
                .toList();
    }

    public User getUserById(long id){
        return
                userRepository.findById(id).orElseThrow(
                        () -> new AppException(ErrorCode.USER_NOT_FOUND)
                );
    }

    public UserResponse getInfo(){
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        return getUserResponseByEmail(email);
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public void updateRole(User _user, PredefinedRole _role){
        var user = _user;
        if (user == null)
            user = getUserByEmail(
                    SecurityUtils.getCurrentUserLogin()
            );

        var role = roleService.findRoleByName(_role);

        if (user.getRole().getName().equalsIgnoreCase(role.getName()))
            return;
        user.setRole(role);
        userRepository.save(user);
    }

    public UserResponse getUserResponseByEmail(String email){
        return userMapper.toUserResponse(getUserByEmail(email));
    }

    public Boolean existsByEmail(String email) throws ResourceNotFoundException {
        return userRepository.existsByEmail(email);
    }

    public Boolean existsByUsername(String username) throws ResourceNotFoundException {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public UserResponse createUser(UserCreationRequest userRequest) throws UserAlreadyExistsException {

        if (userRepository.existsByEmail(userRequest.getEmail().toLowerCase()))
            throw new AppException(ErrorCode.USER_EMAIL_EXISTED);

        Role userRole = roleService.findRoleByName(PredefinedRole.USER);

        User user = userMapper.toUser(userRequest);
        user.setRole(userRole);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        log.info("[service.UserService]: email: " + user.getEmail());

        return userMapper.toUserResponse(userRepository.save(user));
    }


    @Transactional
    public void updateUser(long id, UpdateUserRequest request){

        var _user = getUserById(id);
        userMapper.updateUser(_user, request);

        userRepository.save(_user);
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

    public OverviewResponse getOverviewInfo(){
        String email = SecurityUtils.getCurrentUserLogin();
        var user = getUserByEmail(email);

        List<Course> cor = courseRepository.retrieveAllCourseOfUser(user.getId());
        List<TestResponse> tests = testRepository.retrieveBySubmission(user.getId());

        return OverviewResponse.builder()
                .courses(cor)
                .tests(tests)
                .build();
    }
}
