package org.example.springnewsapp.controller;

import org.example.springnewsapp.dto.ArticleDto;
import org.example.springnewsapp.dto.BookmarkRequest;
import org.example.springnewsapp.model.Bookmark;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.BookmarkRepository;
import org.example.springnewsapp.repository.UserRepository;
import org.example.springnewsapp.security.util.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    public BookmarkController(BookmarkRepository bookmarkRepository, UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
    }

    // ------------------ Add a bookmark ------------------
    @PostMapping
    public ResponseEntity<ArticleDto> addBookmark(@RequestBody BookmarkRequest request) {
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bookmark bookmark = new Bookmark(
                request.getTitle(),
                request.getDescription(),
                request.getContent(),
                request.getUrl(),
                request.getImage(),
                request.getSource(),
                request.getPublishedAt(),
                user
        );

        Bookmark saved = bookmarkRepository.save(bookmark);

        ArticleDto dto = new ArticleDto(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getContent(),
                saved.getUrl(),
                saved.getImage(),
                saved.getSource(),
                saved.getPublishedAt(),
                user.getEmail()
        );

        return ResponseEntity.ok(dto);
    }

    // ------------------ Get all bookmarks for current user ------------------
    @GetMapping
    public ResponseEntity<List<ArticleDto>> getBookmarks() {
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ArticleDto> articles = bookmarkRepository.findByUser(user)
                .stream()
                .map(b -> new ArticleDto(
                        b.getId(),
                        b.getTitle(),
                        b.getDescription(),
                        b.getContent(),
                        b.getUrl(),
                        b.getImage(),
                        b.getSource(),
                        b.getPublishedAt(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(articles);
    }

    // ------------------ Delete a bookmark ------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable Long id) {
        bookmarkRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
