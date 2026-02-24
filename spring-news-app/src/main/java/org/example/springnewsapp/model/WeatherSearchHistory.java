package org.example.springnewsapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_search_history")
public class WeatherSearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private LocalDateTime searchedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public WeatherSearchHistory() {}

    public WeatherSearchHistory(String city, LocalDateTime searchedAt, User user) {
        this.city = city;
        this.searchedAt = searchedAt;
        this.user = user;
    }

    public Long getId() { return id; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public LocalDateTime getSearchedAt() { return searchedAt; }
    public void setSearchedAt(LocalDateTime searchedAt) { this.searchedAt = searchedAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
