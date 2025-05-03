package com.example.toiyeuit.service;

import com.example.toiyeuit.config.RsaKeyProperties;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.InvalidTokenRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class JwtService {


    @Autowired
    private RsaKeyProperties rsaKey;

    @Autowired
    private JwtEncoder jwtEncoder;


    @Value("${jwt.valid-duration}")
    protected Long VALID_DURATION;

    @Value("${jwt.refresh-duration}")
    protected Long REFRESHING_DURATION;
    @Autowired
    private InvalidTokenRepository invalidTokenRepository;




    public String generateToken(User user, Boolean isRefresh){

        Instant now = Instant.now();

        String scope = String.valueOf(
                Optional.of(user.getRole()).orElseThrow(()->
                        new ResourceNotFoundException("PredefinedRole not found")
                )
        );

        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .subject(user.getEmail())
                .issuer("mikudeptrai")
                .issuedAt(now)
                .expiresAt(now.plus( isRefresh ? REFRESHING_DURATION : VALID_DURATION, ChronoUnit.HOURS))
                .id(UUID.randomUUID().toString())
                .claim("scope", scope)
                .claim("is-refresh-token", isRefresh)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();

    }

    public SignedJWT verifyToken(String token) throws ParseException, JOSEException {
        if (token == null || token.trim().isEmpty()){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        JWSVerifier verifier = new RSASSAVerifier(rsaKey.publicKey());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        if (expiryTime.before(new Date())){
            throw new AppException(ErrorCode.EXPIRED_TOKEN);
        }

        if (!signedJWT.verify(verifier)) throw new AppException(ErrorCode.INVALID_TOKEN);

        String id = signedJWT.getJWTClaimsSet().getJWTID();
        if (invalidTokenRepository.existsById(id)){
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        return signedJWT;
    }
}
