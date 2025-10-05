package com.example.conferencetracker.controller;

import com.example.conferencetracker.model.Location;
import com.example.conferencetracker.service.LocationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService service;

    @GetMapping
    public List<Location> all() {
        return service.findAll();
    }

    @PostMapping
    public Location create(@RequestBody Location location) {
        return service.save(location);
    }
}
