package com.example.toiyeuit.service;

import com.example.toiyeuit.config.RsaKeyProperties;
import com.example.toiyeuit.dto.request.ExchangeTokenRequest;
import com.example.toiyeuit.dto.request.LoginRequest;
import com.example.toiyeuit.dto.request.LogoutRequest;
import com.example.toiyeuit.dto.request.RefreshTokenRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.AuthTokenResponse;
import com.example.toiyeuit.dto.response.ExchangeTokenResponse;
import com.example.toiyeuit.entity.InvalidToken;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.entity.VerificationToken;
import com.example.toiyeuit.enums.PredefinedRole;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.mapper.UserMapper;
import com.example.toiyeuit.repository.InvalidTokenRepository;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.repository.http_client.Oauth2IdentityClient;
import com.example.toiyeuit.repository.http_client.Oauth2UserInfoClient;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.JWTClaimsSet;

import com.nimbusds.jwt.SignedJWT;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.security.interfaces.RSAPublicKey;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    // gen token
    // verify token
    // refresh token
    // login
    // logout
    //

    InvalidTokenRepository invalidTokenRepo;


    UserRepository userRepository;


    PasswordEncoder passwordEncoder;


    UserService userService;


    JwtService jwtService;


    VerificationService verificationService;

    JavaMailSenderImpl mailSender;

    UserMapper userMapper;

    Oauth2IdentityClient oauth2IdentityClient;

    Oauth2UserInfoClient userInfoClient;

    @Value(value = "${jwt.valid-duration}")
    private static int VALID_DURATION;

   RoleService roleService;


    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    protected String REDIRECT_URI;

    @NonFinal
    protected String DEFAULT_PASSWORD = "12345";

    protected static String GRANT_TYPE = "authorization_code";

    public AuthTokenResponse outboundAuthentication(String provider, String code, HttpServletResponse response){
        ExchangeTokenResponse resp = oauth2IdentityClient.exchangeToken(
                ExchangeTokenRequest.builder()
                        .code(code)
                        .clientId(CLIENT_ID)
                        .clientSecret(CLIENT_SECRET)
                        .redirectUri(REDIRECT_URI)
                        .grantType("authorization_code")
                        .build()
        );

        log.info("ACCESS TOKEN RESPONSE {}", resp.getAccessToken());

        var userInfo =  userInfoClient.getUserInfo("json", resp.getAccessToken());

        log.info("SIGNING IN FROM {}\nUser: {}\nEmail: {}", provider,userInfo.getName(), userInfo.getEmail());

        log.info("email; {}", userInfo.getEmail());

        String email = userInfo.getEmail();

        var user = userRepository.findByEmail(email+"").orElseGet(
                        () -> {
                            return userRepository.save(
                                    User.builder()
                                            .role(roleService.findRoleByName(PredefinedRole.USER))
                                            .username(userInfo.getName())
                                            .email(userInfo.getEmail())
                                            .password(DEFAULT_PASSWORD)
                                            .build()
                            );
                        }
                );
      //  User user = userService.getUserByEmail(userInfo.getEmail());
               /* .orElseGet(
                        () -> {log.info("inside");
                           return  userRepository.save(
                                    User.builder()
                                            //.role(roleService.findRoleByName(PredefinedRole.USER))
                                            .username(userInfo.getName())
                                            .email(userInfo.getEmail())
                                         //   .password("2332")
                                            .build()
                            );
                        }
                );*/


        String token = jwtService.generateToken(user, false);

        response.addCookie(setCookie("jwt", token));


        return AuthTokenResponse.builder()
                .role(user.getRole().getName())
                .token(token)
                .build();


    }

    public AuthTokenResponse authenticate(LoginRequest loginRequest, HttpServletResponse response){

       var user = userRepository.findByEmail(loginRequest.getEmail())
               .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

       boolean matches = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());

       if (!matches) throw new AppException(ErrorCode.INVALID_CREDENTIALS);

       String token = jwtService.generateToken(user, false);

       response.addCookie(setCookie("jwt", token));

       return AuthTokenResponse.builder()
               .role(user.getRole().getName())
               .token(token)
               .build();
    }

   // public AuthTokenResponse

    public Cookie setCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);

        cookie.setMaxAge(VALID_DURATION*60*60);
     //   cookie.setHttpOnly(true);  cai loz nay lam byg nay gio
        cookie.setPath("/");
        cookie.setSecure(false);
        return cookie;
    }

    public AuthTokenResponse refresh(RefreshTokenRequest token) throws ParseException, JOSEException {
        var signedToken = jwtService.verifyToken(token.getToken());

        var email = signedToken.getJWTClaimsSet().getSubject();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        var newToken = jwtService.generateToken(user, Boolean.FALSE);

        return AuthTokenResponse.builder()
                .token(newToken)
                .role(user.getRole().getName())
                .build();
    }

    public String logout(LogoutRequest request) throws ParseException, JOSEException {
        String token = request.getToken();

        var signedJwt = jwtService.verifyToken(token);

        String jid = signedJwt.getJWTClaimsSet().getJWTID();
        java.util.Date expiry = signedJwt.getJWTClaimsSet().getExpirationTime();

        if (!invalidTokenRepo.existsById(jid)) {
            invalidTokenRepo.save(
                    InvalidToken.builder()
                            .expiryTime(expiry)
                            .id(jid)
                            .build()
            );
        }
        else {
          log.info("Token has already been invalidated");
        }
        return "User has been logged out!";
    }
    public String forgetPassword(String email) {
        return verificationService.createNewPassword(email);
    }

    // reuse if permission present
    //private String buildScope(User user) {
    //    StringJoiner stringJoiner = new StringJoiner(" ");
    //     Optional.ofNullable(user.getRole()).ifPresent(role -> {
    //        stringJoiner.add(role.getName());
    //         Optional.ofNullable(role.getPermissions()).ifPresent(permissions ->
    //                permissions.forEach(permission -> stringJoiner.add(permission.getName())));
    //    });
    //    return stringJoiner.toString();
}
