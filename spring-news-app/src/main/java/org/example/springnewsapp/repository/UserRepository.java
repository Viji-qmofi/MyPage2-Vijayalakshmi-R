package org.example.springnewsapp.repository;

import org.example.springnewsapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
