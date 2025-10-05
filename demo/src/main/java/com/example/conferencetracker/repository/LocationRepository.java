package com.example.conferencetracker.repository;

import com.example.conferencetracker.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByZipCode(String zipCode);
}
