package org.example.springnewsapp.auth;

public class AuthResponse {

    private final String token;
    private final String email;
    private final String fullName;
    private final String city;
    private final String country;

    public AuthResponse(String token, String email, String fullName, String defaultCity, String country) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
        this.city = defaultCity;
        this.country = country;
    }

    // Converts Jackson /objects to JSON
    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getDefaultCity() { return city; }
    public String getCountry(){ return country; }
}



