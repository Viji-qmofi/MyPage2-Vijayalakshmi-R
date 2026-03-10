package org.example.springnewsapp.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reset your password");
        message.setText("Reset link: " + resetLink);
        System.out.println("RESET LINK: " + resetLink);
        try {
            mailSender.send(message);
            System.out.println("MAIL SKIPPED FOR DEV");
            System.out.println("MAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
    }
}