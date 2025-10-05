package com.example.conferencetracker.repository;

import com.example.conferencetracker.model.Conference;
import com.example.conferencetracker.model.User;
import com.example.conferencetracker.model.Location;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {
    List<Conference> findByUser(User user);
    List<Conference> findByLocation(Location location);
}
