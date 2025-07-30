package com.finconecta.employeeapp.controller;

import com.finconecta.employeeapp.config.JwtUtil;
import com.finconecta.employeeapp.dto.AuthRequest;
import com.finconecta.employeeapp.dto.AuthResponse;
import com.finconecta.employeeapp.entity.User;
import com.finconecta.employeeapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        Optional<User> user = userRepository.findByUsername(request.getUsername());
        if (user.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        String token = jwtUtil.generateToken(user.get().getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
