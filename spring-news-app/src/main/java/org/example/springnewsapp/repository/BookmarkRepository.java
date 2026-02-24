package org.example.springnewsapp.repository;

import org.example.springnewsapp.model.Bookmark;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByUser_EmailAndUrl(String email, String url);

    List<Bookmark> findByUser_Email(String email);

    Page<Bookmark> findByUser_Email(String email, Pageable pageable);

    void deleteByUser_EmailAndUrl(String email, String url);

    void deleteByUser_Email(String email);
}