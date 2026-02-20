package org.example.springnewsapp.security.model;

import org.example.springnewsapp.model.User;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    @NonNull
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(
                        role.getRoleName().name()
                ))
                .collect(Collectors.toSet());
    }

    @Override
    @NonNull
    public String getUsername() {
        return user.getEmail();   // login field
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // remaining methods can return true
}

