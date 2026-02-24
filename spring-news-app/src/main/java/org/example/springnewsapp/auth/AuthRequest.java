package org.example.springnewsapp.auth;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthRequest {
    private String email;
    private String password;

    public AuthRequest() {
    }

    @Email(message = "Invalid email")
    @NotBlank(message = "Email required")
    public String getEmail() {
        return email;
    }

    @NotBlank(message = "Password required")
    public String getPassword() {
        return password;
    }
}


