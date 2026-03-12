package org.example.springnewsapp.dto;

import java.util.Set;

public class UserResponse {

    private String email;
    private String fullName;
    private String city;
    private String country;
    private String profilePicUrl;
    private Set<String> roles;

    public UserResponse(String email, String fullName, String city, String country,
                        String profilePicUrl, Set<String> roles) {

        this.email = email;
        this.fullName = fullName;
        this.city = city;
        this.country = country;
        this.profilePicUrl = profilePicUrl;
        this.roles = roles;
    }

    // getters & setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getProfilePicUrl() { return profilePicUrl; }
    public void setProfilePicUrl(String profilePicUrl) { this.profilePicUrl = profilePicUrl; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }
}