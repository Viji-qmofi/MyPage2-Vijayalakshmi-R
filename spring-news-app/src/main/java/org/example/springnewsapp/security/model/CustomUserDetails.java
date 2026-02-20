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

    /**
     * Returns the authorities granted to the user.
     * @return a collection of GrantedAuthority objects
     */
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

    /**
     * Indicates whether the user's account has expired.
     * @return true if the account is non-expired, false otherwise
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is locked or unlocked.
     * @return true if the account is non-locked, false otherwise
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Indicates whether the user's credentials have expired.
     * @return true if the credentials are non-expired, false otherwise
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled.
     * @return true if the user is enabled, false otherwise
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}

