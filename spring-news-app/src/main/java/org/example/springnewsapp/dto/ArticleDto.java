package org.example.springnewsapp.dto;

public class ArticleDto {
    private Long id;
    private String title;
    private String description;
    private String content;
    private String url;
    private String image;
    private String source;
    private String publishedAt;
    private String userEmail; // optional, only show email

    public ArticleDto() {}

    public ArticleDto(Long id, String title, String description, String content,
                      String url, String image, String source, String publishedAt,
                      String userEmail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.url = url;
        this.image = image;
        this.source = source;
        this.publishedAt = publishedAt;
        this.userEmail = userEmail;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getPublishedAt() { return publishedAt; }
    public void setPublishedAt(String publishedAt) { this.publishedAt = publishedAt; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}
