package org.example.springnewsapp.service;

import org.example.springnewsapp.dto.ArticleDto;
import org.example.springnewsapp.exception.BadRequestException;
import org.example.springnewsapp.exception.NewsApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class NewsService {

    private final WebClient webClient;
    private final String gnewsApiKey;


    public NewsService(WebClient.Builder webClientBuilder,
                       @Value("${gnews.api.key:}") String gnewsApiKey) { // default empty
        if (gnewsApiKey.isEmpty()) {
            throw new IllegalStateException("GNEWS_API_KEY not set!");
        }
        this.webClient = webClientBuilder.baseUrl("https://gnews.io/api/v4").build();
        this.gnewsApiKey = gnewsApiKey;
        System.out.println("NEWS SERVICE CREATED → API KEY LENGTH = " + gnewsApiKey.length());
    }

    /** Get top headlines by category */
    public Map<String, Object> getTopHeadlines(String category) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/top-headlines")
                        .queryParam("category", category)
                        .queryParam("lang", "en")
                        .queryParam("country", "us")
                        .queryParam("apikey", gnewsApiKey)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})  // parse JSON to Map
                .block();
    }

    /**
     * Search news by query
     * @param query e.g. "AI"
     * @param lang optional, default "en"
     * @param country optional, default "us"
     */
    @SuppressWarnings("unchecked")
    public List<ArticleDto> searchNews(String query, String lang, String country) {

        if (query == null || query.isBlank()) {
            throw new BadRequestException("Search query cannot be empty");
        }

        Map<String, Object> response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("q", query)
                        .queryParam("lang", lang != null ? lang : "en")
                        .queryParam("country", country != null ? country : "us")
                        .queryParam("apikey", gnewsApiKey)
                        .build())
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        res -> res.bodyToMono(String.class)
                                .map(body -> new NewsApiException("GNews error: " + body))
                )
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();

        if (response == null || !response.containsKey("articles")) {
            throw new NewsApiException("Invalid response from News API");
        }

        List<Map<String, Object>> articles =
                (List<Map<String, Object>>) response.get("articles");

        return articles.stream()
                .map(a -> new ArticleDto(
                        null,
                        (String) a.get("title"),
                        (String) a.get("description"),
                        (String) a.get("content"),
                        (String) a.get("url"),
                        (String) a.get("image"),
                        a.get("source") != null
                                ? ((Map<String, String>) a.get("source")).get("name")
                                : null,
                        (String) a.get("publishedAt"),
                        null
                ))
                .toList();
    }
}
