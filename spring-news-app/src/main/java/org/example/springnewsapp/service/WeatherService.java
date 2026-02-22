package org.example.springnewsapp.service;

import org.example.springnewsapp.dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public WeatherResponse getWeather(String city) {

            String url = "https://api.openweathermap.org/data/2.5/weather?q="
                    + city + "&appid=" + apiKey + "&units=imperial";

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            // Check if city not found
            if (response == null || response.isEmpty()
                    || (response.containsKey("cod") && !"200".equals(response.get("cod").toString()))) {
                return new WeatherResponse(city, 0.0, null, null, 0,
                        "City '" + city + "' not found");
            }

            Map<String, Object> main = (Map<String, Object>) response.get("main");
            List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
            Map<String, Object> weather = (weatherList != null && !weatherList.isEmpty()) ? weatherList.get(0) : null;

            double temp = main != null && main.get("temp") instanceof Number
                    ? ((Number) main.get("temp")).doubleValue() : 0.0;
            String description = weather != null && weather.get("description") instanceof String
                    ? (String) weather.get("description") : null;
            String icon = weather != null && weather.get("icon") instanceof String
                    ? (String) weather.get("icon") : null;

            int timezone = response.get("timezone") instanceof Number
                    ? ((Number) response.get("timezone")).intValue() : 0;

            String cityName = response.get("name") instanceof String
                    ? (String) response.get("name") : city;

            return new WeatherResponse(cityName, temp, description, icon, timezone, null);

    }
}
