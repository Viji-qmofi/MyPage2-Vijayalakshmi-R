
package org.example.springnewsapp.service;
import org.example.springnewsapp.dto.UpdateProfileRequest;
import org.example.springnewsapp.dto.UserResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;



    @Service
    public class UserService {

        private final UserRepository userRepository;
        @Value("${file.upload-dir}")
        private String uploadDir;

        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public void updatePreferredCity(String email, String city) {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setCity(city);
            userRepository.save(user);
        }

        public UserResponse updateProfile(String email, UpdateProfileRequest request, MultipartFile profilePic) {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            user.setFullName(request.getFullName());
            user.setCity(request.getCity());
            user.setCountry(request.getCountry());

            if (profilePic != null && !profilePic.isEmpty()) {

                Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

                try {

                    // Ensure upload directory exists
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }

                    // Delete old profile picture if exists
                    if (user.getProfilePicUrl() != null && !user.getProfilePicUrl().isBlank()) {

                        String oldFileName = user.getProfilePicUrl().replace("/uploads/", "");
                        Path oldFilePath = uploadPath.resolve(oldFileName);

                        Files.deleteIfExists(oldFilePath);
                    }

                    // Generate unique filename using UUID
                    String fileName = UUID.randomUUID() + "_" + profilePic.getOriginalFilename();

                    Path filePath = uploadPath.resolve(fileName);

                    System.out.println("Saving profile pic to: " + filePath);

                    Files.copy(profilePic.getInputStream(), filePath);

                    // Save URL for frontend
                    user.setProfilePicUrl("/uploads/" + fileName);

                } catch (IOException e) {
                    e.printStackTrace();
                    throw new RuntimeException("Failed to store file", e);
                }
            }

            userRepository.save(user);

            return mapToUserResponse(user);
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

        public UserResponse getUserProfile(String email) {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Set<String> roleNames = user.getRoles().stream()
                    .map(role -> role.getRoleName().name())
                    .collect(Collectors.toSet());

            return new UserResponse(
                    user.getEmail(),
                    user.getFullName(),
                    user.getCity(),
                    user.getCountry(),
                    user.getProfilePicUrl(),
                    roleNames
            );
        }

    }

