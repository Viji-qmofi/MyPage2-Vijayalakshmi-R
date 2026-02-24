package org.example.springnewsapp.controller;

import jakarta.transaction.Transactional;
import org.example.springnewsapp.dto.ApiResponse;
import org.example.springnewsapp.dto.ArticleDto;
import org.example.springnewsapp.dto.BookmarkRequest;
import org.example.springnewsapp.model.Bookmark;
import org.example.springnewsapp.security.util.SecurityUtil;
import org.example.springnewsapp.service.BookmarkService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    // ------------------ Add a bookmark ------------------
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<ArticleDto>> addBookmark(@RequestBody BookmarkRequest request) {
        String email = SecurityUtil.getCurrentUserEmail();

        // Save bookmark
        Bookmark saved = bookmarkService.addBookmarkAndReturn(request, email);

        // Convert to DTO
        ArticleDto dto = new ArticleDto(
                saved.getId(),
                saved.getTitle(),
                saved.getDescription(),
                saved.getContent(),
                saved.getUrl(),
                saved.getImage(),
                saved.getSource(),
                saved.getPublishedAt(),
                saved.getUser().getEmail()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Bookmark added successfully", dto));
    }

    // ------------------ Get bookmarks (paginated) ------------------
    @GetMapping("/get")
    public ResponseEntity<ApiResponse<List<ArticleDto>>> getBookmarks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        String email = SecurityUtil.getCurrentUserEmail();
        Page<Bookmark> bookmarksPage = bookmarkService.getBookmarks(email, page, size);

        List<ArticleDto> bookmarks = bookmarksPage.getContent().stream()
                .map(b -> new ArticleDto(
                        b.getId(),
                        b.getTitle(),
                        b.getDescription(),
                        b.getContent(),
                        b.getUrl(),
                        b.getImage(),
                        b.getSource(),
                        b.getPublishedAt(),
                        b.getUser().getEmail()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResponse<>("Bookmarks fetched successfully", bookmarks)
        );
    }

    // ------------------ Delete a single bookmark ------------------
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<Void>> deleteBookmark(@RequestParam String url) {
        String email = SecurityUtil.getCurrentUserEmail();
        bookmarkService.deleteBookmark(email, url);
        return ResponseEntity.ok(new ApiResponse<>("Bookmark deleted successfully"));
    }

    // ------------------ Delete all bookmarks ------------------
    @DeleteMapping("/delete-all")
    @Transactional
    public ResponseEntity<ApiResponse<Void>> deleteAllBookmarks() {
        String email = SecurityUtil.getCurrentUserEmail();
        bookmarkService.deleteAllBookmarks(email);
        return ResponseEntity.ok(new ApiResponse<>("All bookmarks deleted successfully"));
    }
}