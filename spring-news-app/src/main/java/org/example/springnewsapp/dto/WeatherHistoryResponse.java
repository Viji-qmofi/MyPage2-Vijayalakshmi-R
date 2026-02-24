package org.example.springnewsapp.dto;

import java.time.LocalDateTime;

public class WeatherHistoryResponse {

    private Long id;
    private String city;
    private LocalDateTime searchedAt;

    public WeatherHistoryResponse(Long id, String city, LocalDateTime searchedAt) {
        this.id = id;
        this.city = city;
        this.searchedAt = searchedAt;
    }

    public Long getId() { return id; }
    public String getCity() { return city; }
    public LocalDateTime getSearchedAt() { return searchedAt; }
}
