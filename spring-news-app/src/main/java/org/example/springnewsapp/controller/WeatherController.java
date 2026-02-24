package org.example.springnewsapp.controller;

import org.example.springnewsapp.dto.WeatherResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.UserRepository;
import org.example.springnewsapp.security.util.SecurityUtil;
import org.example.springnewsapp.service.UserService;
import org.example.springnewsapp.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;
    private final UserRepository userRepository;
    private final UserService userService;

    public WeatherController(WeatherService weatherService,
                             UserRepository userRepository, UserService userService) {
        this.weatherService = weatherService;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    /**
     * GET /api/weather?city=Chicago
     * If no city provided, defaults to Chicago for guests
     */
    @GetMapping
    public ResponseEntity<WeatherResponse> getWeather(@RequestParam(required = false) String city) {
        try {
            String targetCity = (city == null || city.isBlank()) ? "Chicago" : city;
            WeatherResponse weather = weatherService.getWeather(targetCity);
            return ResponseEntity.ok(weather);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new WeatherResponse(
                    null, 0.0, null, null, 0, "City Not Found"
            ));
        }
    }

    /**
     * GET /api/weather/me
     * Fetch weather based on logged-in user's city
     */
    @GetMapping("/me")
    public ResponseEntity<WeatherResponse> getMyWeather() {
        try {
            String email = SecurityUtil.getCurrentUserEmail();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            WeatherResponse weather = weatherService.getWeather(user.getCity());
            return ResponseEntity.ok(weather);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new WeatherResponse(
                    null, 0.0, null, null, 0, "Failed to fetch weather"
            ));
        }
    }

    @PutMapping("/preferred-city")
    public ResponseEntity<?> updatePreferredCity(@RequestParam String city) {

        String email = SecurityUtil.getCurrentUserEmail();

        userService.updatePreferredCity(email, city);

        return ResponseEntity.ok(Map.of(
                "message", "Preferred city updated successfully",
                "city", city
        ));
    }

}
