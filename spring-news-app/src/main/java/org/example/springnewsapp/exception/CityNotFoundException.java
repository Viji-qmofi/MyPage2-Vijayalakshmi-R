package org.example.springnewsapp.exception;

public class CityNotFoundException extends RuntimeException {
    public CityNotFoundException(String city) {
        super("City '" + city + "' not found");
    }
}

