package org.example.springnewsapp.auth;

import org.example.springnewsapp.dto.*;
import org.example.springnewsapp.service.PasswordResetService;
import jakarta.validation.Valid;
import org.example.springnewsapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final PasswordResetService passwordResetService;

    public AuthController(AuthService authService,
                          UserService userService,
                          PasswordResetService passwordResetService) {
        this.authService = authService;
        this.userService = userService;
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Map<String, String>>> register(
            @Valid @RequestBody RegisterRequest request) {

        String token = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        "User registered successfully",
                        Map.of("token", token)
                ));
    }

    @PutMapping("/make-admin/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> makeAdmin(@PathVariable String email) {

        authService.makeAdmin(email);

        return ResponseEntity.ok(
                new ApiResponse<>("User promoted to ADMIN", null)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody AuthRequest request) {

        AuthResponse authResponse = authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>("Login successful", authResponse)
        );
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Object>> me() {

        var auth = SecurityContextHolder.getContext().getAuthentication();

        return ResponseEntity.ok(
                new ApiResponse<>("Current authenticated user", auth)
        );
    }

    @PutMapping("/update-profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @ModelAttribute UpdateProfileRequest request,
            @RequestParam(value = "profilePic", required = false) MultipartFile profilePic) {

        UserResponse updatedUser =
                userService.updateProfile(userDetails.getUsername(), request, profilePic);

        return ResponseEntity.ok(
                new ApiResponse<>("Profile updated successfully", updatedUser)
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        passwordResetService.forgotPassword(request.getEmail());

        return ResponseEntity.ok(
                new ApiResponse<>("If that email is registered, a password reset link has been sent.", null)
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        passwordResetService.resetPassword(request.getToken(), request.getPassword());

        return ResponseEntity.ok(
                new ApiResponse<>("Password reset successful.", null)
        );
    }

    @GetMapping("/oauth-user")
    public ResponseEntity<ApiResponse<UserResponse>> getOAuthUser(
            @AuthenticationPrincipal UserDetails userDetails) {

        UserResponse user =
                userService.getUserProfile(userDetails.getUsername());

        return ResponseEntity.ok(
                new ApiResponse<>("OAuth user fetched successfully", user)
        );
    }
}