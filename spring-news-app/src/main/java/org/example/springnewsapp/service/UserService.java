
package org.example.springnewsapp.service;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.UserRepository;
import org.springframework.stereotype.Service;

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
}
