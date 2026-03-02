package org.example.springnewsapp.dto;

import java.util.Set;

public class UserResponse {

    private Long id;
    private String email;
    private String fullName;
    private String city;
    private String country;
    private Set<String> roles;

    public UserResponse(Long id, String email, String fullName,
                        String city, String country, Set<String> roles) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.city = city;
        this.country = country;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public Set<String> getRoles() {
        return roles;
    }

    // getters
}
