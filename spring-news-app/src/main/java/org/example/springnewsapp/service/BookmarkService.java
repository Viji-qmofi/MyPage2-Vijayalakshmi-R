package org.example.springnewsapp.service;

import org.example.springnewsapp.dto.BookmarkRequest;
import org.example.springnewsapp.model.Bookmark;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.BookmarkRepository;
import org.example.springnewsapp.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository,
                           UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
    }

    // ------------------ Add bookmark and return it ------------------
    public Bookmark addBookmarkAndReturn(BookmarkRequest request, String email) {
        Optional<Bookmark> existing = bookmarkRepository.findByUser_EmailAndUrl(email, request.getUrl());
        if (existing.isPresent()) {
            return existing.get(); // return existing bookmark if already exists
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bookmark bookmark = new Bookmark();
        bookmark.setTitle(request.getTitle());
        bookmark.setDescription(request.getDescription());
        bookmark.setContent(request.getContent());
        bookmark.setUrl(request.getUrl());
        bookmark.setImage(request.getImage());
        bookmark.setSource(request.getSource());
        bookmark.setPublishedAt(request.getPublishedAt());
        bookmark.setUser(user);

        return bookmarkRepository.save(bookmark);
    }

    // ------------------ Get bookmarks with pagination ------------------
    public Page<Bookmark> getBookmarks(String email, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("publishedAt").descending());
        return bookmarkRepository.findByUser_Email(email, pageable);
    }

    // ------------------ Delete a single bookmark ------------------
    public void deleteBookmark(String email, String url) {
        bookmarkRepository.deleteByUser_EmailAndUrl(email, url);
    }

    // ------------------ Delete all bookmarks ------------------
    public void deleteAllBookmarks(String email) {
        bookmarkRepository.deleteByUser_Email(email);
    }
}