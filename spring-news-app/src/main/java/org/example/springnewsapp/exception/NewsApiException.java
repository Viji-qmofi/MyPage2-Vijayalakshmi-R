package org.example.springnewsapp.exception;

public class NewsApiException extends RuntimeException {
    public NewsApiException(String message) {
        super(message);
    }
}
