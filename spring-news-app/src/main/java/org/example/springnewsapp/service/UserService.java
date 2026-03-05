
package org.example.springnewsapp.service;
import org.example.springnewsapp.dto.UpdateProfileRequest;
import org.example.springnewsapp.dto.UserResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.UserRepository;
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

            // ONLY run file logic if a new file exists
            if (profilePic != null && !profilePic.isEmpty()) {

                String fileName = System.currentTimeMillis() + "_" + profilePic.getOriginalFilename();

                // Handle profile pic
                Path uploadPath = Paths.get("C:/Users/vijir/MyPage2-Vijayalakshmi-R/uploads");

                try {

                    // Ensure directory exists
                    if (!Files.exists(uploadPath)) {
                        Files.createDirectories(uploadPath);
                    }

                   // String fileName = System.currentTimeMillis() + "_" + profilePic.getOriginalFilename();

                    Path filePath = uploadPath.resolve(fileName);

                    System.out.println("Saving profile pic to: " + filePath);

                    // ✅ Replace if already exists
                    Files.copy(profilePic.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                    user.setProfilePicUrl("/uploads/" + fileName);

                } catch (IOException e) {
                    e.printStackTrace();  // VERY IMPORTANT for debugging
                    throw new RuntimeException("Failed to store file", e);
                }
            }

            userRepository.save(user);

            return mapToUserResponse(user);  // make sure UserResponse has profilePicUrl field
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

