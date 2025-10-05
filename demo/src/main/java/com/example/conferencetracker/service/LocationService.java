package com.example.conferencetracker.service;

import com.example.conferencetracker.model.Location;
import com.example.conferencetracker.repository.LocationRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository repo;

    public List<Location> findAll() {
        return repo.findAll();
    }

    public Location save(Location location) {
        return repo.save(location);
    }
}
