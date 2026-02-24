package org.example.springnewsapp.controller;

import org.example.springnewsapp.dto.WeatherHistoryResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.model.WeatherSearchHistory;
import org.example.springnewsapp.repository.UserRepository;
import org.example.springnewsapp.repository.WeatherSearchHistoryRepository;
import org.example.springnewsapp.security.util.SecurityUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather/history")
public class WeatherHistoryController {

    private final WeatherSearchHistoryRepository historyRepository;
    private final UserRepository userRepository;

    public WeatherHistoryController(WeatherSearchHistoryRepository historyRepository,
                                    UserRepository userRepository) {
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<WeatherHistoryResponse> getHistory() {
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepository.findByUserIdOrderBySearchedAtDesc(user.getId())
                .stream()
                .map(h -> new WeatherHistoryResponse(h.getId(), h.getCity(), h.getSearchedAt()))
                .toList();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        historyRepository.deleteById(id);
    }
}