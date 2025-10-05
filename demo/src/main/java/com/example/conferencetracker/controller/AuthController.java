package com.example.conferencetracker.controller;

import com.example.conferencetracker.repository.UserRepository;
import com.example.conferencetracker.security.JwtUtil;
import com.example.conferencetracker.service.UserService;
import com.example.conferencetracker.model.User;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.origin}")
@Validated
public class AuthController {

    public static class AuthRequest {
        @NotBlank(message = "Username potreban")
        @Size(min = 3, max = 50)
        public String username;

        @NotBlank(message = "Sifra potrebna")
        @Size(min = 4, max = 200)
        public String password;
    }

    private final UserService userService;
    private final JwtUtil jwt;
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;

    public AuthController(UserService userService, JwtUtil jwt, AuthenticationManager authManager, UserRepository userRepository) {
        this.userService = userService;
        this.jwt = jwt;
        this.authManager = authManager;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@Valid @RequestBody AuthRequest req) {
        if (userRepository.existsByUsername(req.username)) {
            return Map.of("message", "Username postoji");
        }
        User user = userService.register(req.username, req.password);
        return Map.of("id", user.getId(), "username", user.getUsername(), "message", "Uspesna");
    }

    @PostMapping("/login")
    public Map<String, String> login(@Valid @RequestBody AuthRequest req) {
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(req.username, req.password);
        authManager.authenticate(token);
        String jwtToken = jwt.generateToken(req.username);
        return Map.of("token", jwtToken);
    }
}
