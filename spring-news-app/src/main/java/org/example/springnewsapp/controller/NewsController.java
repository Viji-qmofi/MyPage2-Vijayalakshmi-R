package org.example.springnewsapp.controller;

import org.example.springnewsapp.dto.ApiResponse;
import org.example.springnewsapp.dto.ArticleDto;
import org.example.springnewsapp.service.NewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    /** GET /api/news/top?category=technology */
    @GetMapping("/top")
    public ResponseEntity<?> getTopHeadlines(
            @RequestParam(required = false, defaultValue = "general") String category,
            Authentication authentication) {

        boolean isGuest = (authentication == null || !authentication.isAuthenticated());

        if (isGuest && !"general".equalsIgnoreCase(category)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Guests can only access general news");
        }

        return ResponseEntity.ok(newsService.getTopHeadlines(category));
    }

    /** GET /api/news/search?query=AI&lang=en&country=us */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ArticleDto>>> search(
            @RequestParam String query,
            @RequestParam(required = false) String lang,
            @RequestParam(required = false) String country) {

        List<ArticleDto> articles = newsService.searchNews(query, lang, country);

        String message = articles.isEmpty()
                ? "No articles found"
                : "News fetched successfully";

        return ResponseEntity.ok(new ApiResponse<>(message, articles));
    }
}
