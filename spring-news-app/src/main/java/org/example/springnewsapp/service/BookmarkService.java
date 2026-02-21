package org.example.springnewsapp.service;

import org.example.springnewsapp.dto.BookmarkRequest;
import org.example.springnewsapp.model.Bookmark;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.BookmarkRepository;
import org.example.springnewsapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository,
                           UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
    }

    public void addBookmark(BookmarkRequest request, String email) {

        if (bookmarkRepository.findByUserEmailAndUrl(email, request.getUrl()).isPresent()) {
            return;
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

        bookmarkRepository.save(bookmark);
    }

    public List<Bookmark> getBookmarks(String email) {
        return bookmarkRepository.findByUserEmail(email);
    }

    public void deleteBookmark(String email, String url) {
        bookmarkRepository.deleteByUserEmailAndUrl(email, url);
    }
}

