
package org.example.springnewsapp.service;
import org.example.springnewsapp.dto.UpdateProfileRequest;
import org.example.springnewsapp.dto.UserResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Set;
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

        public UserResponse updateProfile(String email, UpdateProfileRequest request) {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (request.getFullName() != null)
                user.setFullName(request.getFullName());

            if (request.getCity() != null)
                user.setCity(request.getCity());

            if (request.getCountry() != null)
                user.setCountry(request.getCountry());

            userRepository.save(user);

            return mapToResponse(user);
        }

        private UserResponse mapToResponse(User user) {

            Set<String> roleNames = user.getRoles()
                    .stream()
                    .map(role -> role.getRoleName().name())
                    .collect(Collectors.toSet());

            return new UserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getCity(),
                    user.getCountry(),
                    roleNames
            );
        }
    }

