package org.example.springnewsapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class NewsService {

    private final WebClient webClient;
    private final String gnewsApiKey;

    /*public NewsService(WebClient.Builder webClientBuilder,
                       @Value("${gnews.api.key}") String gnewsApiKey) {
        this.webClient = webClientBuilder.baseUrl("https://gnews.io/api/v4").build();
        this.gnewsApiKey = gnewsApiKey;
    }*/
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
    public Map<String, Object> searchNews(String query, String lang, String country) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("q", query)
                        .queryParam("lang", lang != null ? lang : "en")
                        .queryParam("country", country != null ? country : "us")
                        .queryParam("apikey", gnewsApiKey)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }
}
