package org.example.springnewsapp.repository;

import jakarta.transaction.Transactional;
import org.example.springnewsapp.model.PasswordResetToken;
import org.example.springnewsapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    @Transactional
    void deleteByUser(User user);
}