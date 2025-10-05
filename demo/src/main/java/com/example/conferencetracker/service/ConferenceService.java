package com.example.conferencetracker.service;

import com.example.conferencetracker.model.Conference;
import com.example.conferencetracker.model.User;
import com.example.conferencetracker.repository.ConferenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConferenceService {

    private final ConferenceRepository repo;

    public ConferenceService(ConferenceRepository repo) {
        this.repo = repo;
    }

    public List<Conference> list(User owner) {
        return repo.findByUser(owner);
    }

    public Conference create(Conference c, User owner) {
        c.setId(null);
        c.setUser(owner);
        return repo.save(c);
    }

    public Optional<Conference> findById(Long id) {
        return repo.findById(id);
    }

    public Conference save(Conference c) {
        return repo.save(c);
    }

    public void delete(Conference c) {
        repo.delete(c);
    }
}
