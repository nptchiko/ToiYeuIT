package com.example.toiyeuit.service.security;

import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
// class nay de support authorization
public class CustomUseDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return getGrantedAuthorities(List.of(user.getRole()));
            }

            @Override
            public String getPassword() {
                return user.getPassword();
            }

            @Override
            public String getUsername() {
               return user.getEmail();
            }
        };
    }

    private Collection<? extends GrantedAuthority> getGrantedAuthorities(Collection<Role> roles){
        List<GrantedAuthority> authorities = new ArrayList<>();

        for (Role role : roles){
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }
}
