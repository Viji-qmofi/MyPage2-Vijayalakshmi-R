package org.example.springnewsapp.security.config;

import jakarta.annotation.PostConstruct;
import org.example.springnewsapp.model.Role;
import org.example.springnewsapp.model.RoleType;
import org.example.springnewsapp.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder {

    @Autowired
    private RoleRepository repo;

    @PostConstruct
    public void seedRoles() {
        for (RoleType role : RoleType.values()) {
            repo.findByRoleName(role)
                    .orElseGet(() -> repo.save(new Role(role)));
        }
    }
}

