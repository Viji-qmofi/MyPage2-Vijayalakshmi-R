package org.example.springnewsapp.dto;

public class WeatherResponse {
    private String city;
    private double temp;
    private String description;
    private String icon;
    private int timezone;
    private String error; // optional error message

    public WeatherResponse() {}

    public WeatherResponse(String city, double temp, String description, String icon, int timezone, String error) {
        this.city = city;
        this.temp = temp;
        this.description = description;
        this.icon = icon;
        this.timezone = timezone;
        this.error = error;
    }

    // Getters and setters
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public double getTemp() { return temp; }
    public void setTemp(double temp) { this.temp = temp; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public int getTimezone() { return timezone; }
    public void setTimezone(int timezone) { this.timezone = timezone; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}
