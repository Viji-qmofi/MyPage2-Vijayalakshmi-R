package org.example.springnewsapp.service;

import org.example.springnewsapp.dto.WeatherResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.model.WeatherSearchHistory;
import org.example.springnewsapp.repository.UserRepository;
import org.example.springnewsapp.repository.WeatherSearchHistoryRepository;
import org.example.springnewsapp.security.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final UserRepository userRepository;
    private final WeatherSearchHistoryRepository historyRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public WeatherService(UserRepository userRepository,
                          WeatherSearchHistoryRepository historyRepository) {
        this.userRepository = userRepository;
        this.historyRepository = historyRepository;
    }

    @SuppressWarnings("unchecked")
    public WeatherResponse getWeather(String city) {

        city = city.trim();

        String url = "https://api.openweathermap.org/data/2.5/weather?q="
                + city + "&appid=" + apiKey + "&units=imperial";

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        // Do not save invalid city
        if (response == null || response.isEmpty()
                || (response.containsKey("cod") && !"200".equals(response.get("cod").toString()))) {
            return new WeatherResponse(city, 0.0, null, null, 0,
                    "City '" + city + "' not found");
        }

        Map<String, Object> main = (Map<String, Object>) response.get("main");
        List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
        Map<String, Object> weather =
                (weatherList != null && !weatherList.isEmpty()) ? weatherList.get(0) : null;

        double temp = main != null && main.get("temp") instanceof Number
                ? ((Number) main.get("temp")).doubleValue()
                : 0.0;

        String description = weather != null && weather.get("description") instanceof String
                ? (String) weather.get("description")
                : null;

        String icon = weather != null && weather.get("icon") instanceof String
                ? (String) weather.get("icon")
                : null;

        int timezone = response.get("timezone") instanceof Number
                ? ((Number) response.get("timezone")).intValue()
                : 0;

        String cityName = response.get("name") instanceof String
                ? (String) response.get("name")
                : city;

        saveWeatherHistoryIfNeeded(cityName);

        return new WeatherResponse(cityName, temp, description, icon, timezone, null);
    }

    private void saveWeatherHistoryIfNeeded(String cityName) {
        String email = SecurityUtil.getCurrentUserEmail();
        if (email == null) return;

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check duplicate only within latest 5
        List<WeatherSearchHistory> lastFive =
                historyRepository.findTop5ByUserIdOrderBySearchedAtDesc(user.getId());

        boolean alreadyExists = lastFive.stream()
                .anyMatch(history -> history.getCity() != null
                        && history.getCity().equalsIgnoreCase(cityName));

        if (alreadyExists) {
            return;
        }

        // If already 5 records, remove oldest one first
        long historyCount = historyRepository.countByUserId(user.getId());

        if (historyCount >= 5) {
            WeatherSearchHistory oldest =
                    historyRepository.findTopByUserIdOrderBySearchedAtAsc(user.getId());

            if (oldest != null) {
                historyRepository.delete(oldest);
            }
        }

        WeatherSearchHistory newHistory =
                new WeatherSearchHistory(cityName, LocalDateTime.now(), user);

        historyRepository.save(newHistory);
    }

    public void updatePreferredCity(String email, String city) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setCity(city);
        userRepository.save(user);
    }
}