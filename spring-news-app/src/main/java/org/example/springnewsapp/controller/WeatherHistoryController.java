package org.example.springnewsapp.controller;

import org.example.springnewsapp.dto.ApiResponse;
import org.example.springnewsapp.dto.WeatherHistoryResponse;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.model.WeatherSearchHistory;
import org.example.springnewsapp.repository.UserRepository;
import org.example.springnewsapp.repository.WeatherSearchHistoryRepository;
import org.example.springnewsapp.security.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
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

    // GET history
    @GetMapping
    public ResponseEntity<ApiResponse<List<WeatherHistoryResponse>>> getHistory() {
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<WeatherHistoryResponse> history = historyRepository
                .findByUserIdOrderBySearchedAtDesc(user.getId())
                .stream()
                .map(h -> new WeatherHistoryResponse(h.getId(), h.getCity(), h.getSearchedAt()))
                .toList();

        return ResponseEntity.ok(new ApiResponse<>("Weather history fetched successfully", history));
    }

    // DELETE history item
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        if (!historyRepository.existsById(id)) {
            return ResponseEntity.status(404)
                    .body(new ApiResponse<>("History item not found"));
        }

        historyRepository.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>("History item deleted successfully"));
    }
}
