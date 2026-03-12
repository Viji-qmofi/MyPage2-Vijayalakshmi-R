package org.example.springnewsapp.auth;

import org.example.springnewsapp.dto.UserResponse;
import org.example.springnewsapp.model.Role;
import org.example.springnewsapp.model.RoleType;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.RoleRepository;
import org.example.springnewsapp.repository.UserRepository;
import org.example.springnewsapp.security.jwt.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo,
                       RoleRepository roleRepo,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    // Registration using DTO
    public String register(RegisterRequest request) {

        String email = request.getEmail().toLowerCase();
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        Role userRole = roleRepo.findByRoleName(RoleType.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

        User user = new User(
                email,
                passwordEncoder.encode(request.getPassword()),
                request.getFullName(),
                request.getCity(),
                request.getCountry()
        );
        user.addRole(userRole);

        userRepository.save(user);

        // Generate JWT
        return jwtUtil.generateToken(user);
    }

    public void makeAdmin(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role adminRole = roleRepo.findByRoleName(RoleType.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("ROLE_ADMIN not found"));

        user.addRole(adminRole);
        userRepository.save(user);
    }

    // Login using AuthenticationManager
    public AuthResponse login(AuthRequest request) {
        try {
            // Authenticate email + password
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new RuntimeException("Invalid email or password");
        }

        // Load user from DB to generate JWT and return info
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));

        String token = jwtUtil.generateToken(user);

        UserResponse userResponse = mapToUserResponse(user); // includes profilePicUrl, city, country
        return new AuthResponse(token, userResponse);
    }

    private UserResponse mapToUserResponse(User user) {
        Set<String> roleNames = user.getRoles().stream()
                .map(role -> role.getRoleName().name())
                .collect(Collectors.toSet());

        return new UserResponse(
                user.getEmail(),
                user.getFullName(),
                user.getCity(),          // send city
                user.getCountry(),       // send country
                user.getProfilePicUrl(), // send profile pic URL
                roleNames
        );
    }
}
