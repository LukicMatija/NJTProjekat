package com.example.conferencetracker.controller;

import com.example.conferencetracker.model.User;
import com.example.conferencetracker.repository.UserRepository;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Korisnik nije pronadjen"));
    }
}