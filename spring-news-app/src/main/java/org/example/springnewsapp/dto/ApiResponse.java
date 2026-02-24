package org.example.springnewsapp.dto;

public class ApiResponse<T> {

    private String message;
    private T data;

    public ApiResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public ApiResponse(String message) {
        this.message = message;
        this.data = null;
    }

    public String getMessage() { return message; }
    public T getData() { return data; }
}