package org.example.springnewsapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.region}")
    private String region;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadProfilePic(MultipartFile file) {
        try {
            String originalName = file.getOriginalFilename() == null
                    ? "image"
                    : file.getOriginalFilename().replaceAll("\\s+", "_");

            String key = "profile-pics/" + UUID.randomUUID() + "_" + originalName;

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(
                    putObjectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );

            return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to S3", e);
        }
    }
}