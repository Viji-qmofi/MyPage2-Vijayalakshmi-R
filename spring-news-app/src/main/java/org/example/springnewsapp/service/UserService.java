
package org.example.springnewsapp.service;

import org.example.springnewsapp.dto.UpdateProfileRequest;
import org.example.springnewsapp.dto.UserResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final S3Service s3Service;

    public UserService(UserRepository userRepository, S3Service s3Service) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
    }

    public UserResponse updateProfile(String email, UpdateProfileRequest request, MultipartFile profilePic) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setCity(request.getCity());
        user.setCountry(request.getCountry());

        if (profilePic != null && !profilePic.isEmpty()) {
            String s3Url = s3Service.uploadProfilePic(profilePic);
            user.setProfilePicUrl(s3Url);
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
                user.getCity(),
                user.getCountry(),
                user.getProfilePicUrl(),
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

