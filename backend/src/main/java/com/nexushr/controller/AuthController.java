package com.nexushr.controller;

import com.nexushr.entity.User;
import com.nexushr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.nexushr.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

@Autowired
private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {

        User user = userRepository.findFirstByEmail(loginUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

return jwtService.generateToken(user.getEmail(), user.getRole());    }
}