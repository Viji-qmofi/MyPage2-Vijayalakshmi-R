package org.example.springnewsapp.controller;

import org.example.springnewsapp.service.NewsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    /** GET /api/news?category=technology */
    @GetMapping("/api/news")
    public Map<String, Object> getTopHeadlines(@RequestParam String category) {
        return newsService.getTopHeadlines(category);
    }

    /** GET /api/news/search?query=AI&lang=en&country=us */
    @GetMapping("/api/news/search")
    public Map<String, Object> searchNews(@RequestParam String query,
                                          @RequestParam(required = false) String lang,
                                          @RequestParam(required = false) String country) {
        return newsService.searchNews(query, lang, country);
    }
}
