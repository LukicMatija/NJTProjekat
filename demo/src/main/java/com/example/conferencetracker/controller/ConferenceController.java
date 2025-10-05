package com.example.conferencetracker.controller;

import com.example.conferencetracker.model.Conference;
import com.example.conferencetracker.model.User;
import com.example.conferencetracker.repository.ConferenceRepository;
import com.example.conferencetracker.repository.UserRepository;
import com.example.conferencetracker.service.UserService;
import com.example.conferencetracker.service.ConferenceService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conferences")
@CrossOrigin(origins = "http://localhost:3000")
public class ConferenceController {

    private final ConferenceService service;
    private final UserRepository userRepo;
    private final UserService userService;
    private final ConferenceRepository conferenceRepository;

    public ConferenceController(ConferenceService service, UserRepository userRepo, UserService userService, ConferenceRepository conferenceRepository ) {
        this.service = service;
        this.userRepo = userRepo;
        this.userService = userService;
        this.conferenceRepository = conferenceRepository;
        
    }

    private User me(Authentication auth) {
        return userRepo.findByUsername(auth.getName()).orElseThrow();
    }

    @GetMapping
    public List<Conference> list(Authentication auth) {
        return service.list(me(auth));
    }

    @PostMapping
    public Conference create(@RequestBody Conference c, Authentication auth) {
        return service.create(c, me(auth));
    }

    @PutMapping
    public Conference saveConference(@RequestBody Conference conference, Authentication auth) {
        User user = userService.findByUsername(auth.getName());
        conference.setUser(user);
        return conferenceRepository.save(conference);
    }
    @PutMapping("/{id}")
    public Conference update(@PathVariable Long id, @RequestBody Conference c, Authentication auth) {
        User owner = me(auth);
        Conference db = service.findById(id).orElseThrow();
        if (!db.getUser().getId().equals(owner.getId())) {
            throw new RuntimeException("Greska");
        }
        db.setName(c.getName());
        db.setDate(c.getDate());
        db.setLocation(c.getLocation());
        db.setSpeaker(c.getSpeaker());
        return service.save(db);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication auth) {
        User owner = me(auth);
        Conference db = service.findById(id).orElseThrow();
        if (!db.getUser().getId().equals(owner.getId())) {
            throw new RuntimeException("Greska");
        }
        service.delete(db);
    } 
}
