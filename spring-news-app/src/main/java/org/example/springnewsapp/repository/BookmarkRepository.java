package org.example.springnewsapp.repository;

import org.example.springnewsapp.model.Bookmark;
import org.example.springnewsapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    List<Bookmark> findByUserEmail(String email);

    List<Bookmark> findByUser(User user);

    Optional<Bookmark> findByUserEmailAndUrl(String email, String url);

    void deleteByUserEmailAndUrl(String email, String url);
}

