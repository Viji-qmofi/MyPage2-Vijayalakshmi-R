package org.example.springnewsapp.repository;

import org.example.springnewsapp.model.WeatherSearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeatherSearchHistoryRepository
        extends JpaRepository<WeatherSearchHistory, Long> {

    List<WeatherSearchHistory> findByUserIdOrderBySearchedAtDesc(Long userId);
}
