package com.example.toiyeuit.filter;

import com.example.toiyeuit.config.SecurityConfig;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.service.AuthService;
import com.example.toiyeuit.service.JwtService;
import com.example.toiyeuit.service.security.CustomUseDetailService;
import com.nimbusds.jose.JOSEException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.text.ParseException;

import static com.example.toiyeuit.config.SecurityConfig.*;
import static io.micrometer.common.util.StringUtils.isEmpty;

@Slf4j
@Component
public class JwtTokenFilter extends OncePerRequestFilter{

    @Autowired
    private JwtService authService;

    @Autowired
    private CustomUseDetailService userDetails;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        logger.info("[JwtTokenFilter] working");

        String token = getJwtFromRequest(request);

        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null){
            try {
                var signedToken = authService.verifyToken(token);

                var email = signedToken.getJWTClaimsSet().getSubject();

                logger.info("[JwtTokenFilter] The email extracted from token: "+ email);

                UserDetails userDetail = userDetails.loadUserByUsername(email);

                log.info("[JwtTokenFilter] PredefinedRole: ");

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetail, null, userDetail.getAuthorities()
                        );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

            } catch (ParseException | JOSEException e) {
                throw new RuntimeException(e);
            }
        }

        filterChain.doFilter(request, response);

    }
    private String getJwtFromRequest(HttpServletRequest request){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("[JwtTokenFilter] token: " + token);
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return null;
    }
    /* @Override
     protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
         String path = request.getRequestURI();
         for (String s : PUBLIC_ENDPOINT)
             if (path.matches(s))
                 return true;
         return false;
     }*/
}
