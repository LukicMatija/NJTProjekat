package com.example.conferencetracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "zip_code", unique = true, nullable = false)
    private String zipCode;

    @Column(name = "name", nullable = false)
    private String name;

    public Location() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
