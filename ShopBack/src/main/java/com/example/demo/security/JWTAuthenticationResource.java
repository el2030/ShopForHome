package com.example.demo.security;

import com.example.demo.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController

public class JWTAuthenticationResource {
    private final JwtEncoder jwtEncoder;
    private final CustomerUserDetailsService customerUserDetailsService;

    @Autowired
    public JWTAuthenticationResource(JwtEncoder jwtEncoder, CustomerUserDetailsService customerUserDetailsService) {
        this.jwtEncoder = jwtEncoder;
        this.customerUserDetailsService = customerUserDetailsService;
    }

    @PostMapping("/auth/login")
    public JwtResponse login(Authentication authentication) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(authentication.getName());
        return new JwtResponse(createToken(userDetails));
    }

    private String createToken(UserDetails userDetails) {
        var claims = JwtClaimsSet.builder()
                .issuer("shopforhome")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600))
                .subject(userDetails.getUsername())
                .claim("role", createScope(userDetails))
                .build();
        System.out.println(createScope(userDetails));
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    private Object createScope(UserDetails userDetails) {
        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

    }



    record JwtResponse(String token) {
    }


}
