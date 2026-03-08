package org.example.springnewsapp.security.oauth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.springnewsapp.model.Role;
import org.example.springnewsapp.model.RoleType;
import org.example.springnewsapp.model.User;
import org.example.springnewsapp.repository.RoleRepository;
import org.example.springnewsapp.repository.UserRepository;
import org.example.springnewsapp.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public OAuth2LoginSuccessHandler(UserRepository userRepository,
                                     RoleRepository roleRepository,
                                     JwtUtil jwtUtil,
                                     PasswordEncoder passwordEncoder,
                                     OAuth2AuthorizedClientService authorizedClientService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.authorizedClientService = authorizedClientService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauthUser = oauthToken.getPrincipal();

        String registrationId = oauthToken.getAuthorizedClientRegistrationId().toUpperCase();

        String providerId;
        String email;
        String fullName;

        if ("GOOGLE".equals(registrationId)) {
            providerId = oauthUser.getAttribute("sub");
            email = oauthUser.getAttribute("email");
            fullName = oauthUser.getAttribute("name");

        } else if ("GITHUB".equals(registrationId)) {
            Object idObj = oauthUser.getAttribute("id");
            providerId = idObj != null ? String.valueOf(idObj) : null;
            email = oauthUser.getAttribute("email");
            fullName = oauthUser.getAttribute("name");

            if (fullName == null || fullName.isBlank()) {
                fullName = oauthUser.getAttribute("login");
            }

            if (email == null || email.isBlank()) {
                OAuth2AuthorizedClient authorizedClient =
                        authorizedClientService.loadAuthorizedClient(
                                oauthToken.getAuthorizedClientRegistrationId(),
                                oauthToken.getName()
                        );

                if (authorizedClient != null && authorizedClient.getAccessToken() != null) {
                    email = fetchGithubPrimaryEmail(authorizedClient.getAccessToken().getTokenValue());
                }
            }

        } else {
            throw new RuntimeException("Unsupported OAuth provider");
        }

        if (providerId == null || email == null || email.isBlank()) {
            throw new RuntimeException("Required OAuth user details not found");
        }

        final String finalFullName = fullName;
        final String finalEmail = email;

        User user = userRepository.findByEmail(email.toLowerCase()).orElseGet(() -> {
            Role userRole = roleRepository.findByRoleName(RoleType.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

            User newUser = new User();
            newUser.setEmail(finalEmail.toLowerCase());
            newUser.setFullName(finalFullName);
            newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString())); // OAuth users will have dummy password
            newUser.setProvider(registrationId);
            newUser.setProviderId(providerId);
            newUser.addRole(userRole);
            return newUser;
        });

        user.setProvider(registrationId);
        user.setProviderId(providerId);

        if (user.getFullName() == null || user.getFullName().isBlank()) {
            user.setFullName(fullName);
        }

        userRepository.save(user);

        String jwt = jwtUtil.generateToken(user);
        response.sendRedirect(frontendUrl + "/oauth-success?token=" + jwt);
    }

    private String fetchGithubPrimaryEmail(String accessToken) {
        String url = "https://api.github.com/user/emails";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<List> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                List.class
        );

        List<Map<String, Object>> emails = response.getBody();

        if (emails == null || emails.isEmpty()) {
            return null;
        }

        for (Map<String, Object> emailObj : emails) {
            Boolean primary = (Boolean) emailObj.get("primary");
            Boolean verified = (Boolean) emailObj.get("verified");

            if (Boolean.TRUE.equals(primary) && Boolean.TRUE.equals(verified)) {
                return (String) emailObj.get("email");
            }
        }

        for (Map<String, Object> emailObj : emails) {
            Boolean verified = (Boolean) emailObj.get("verified");
            if (Boolean.TRUE.equals(verified)) {
                return (String) emailObj.get("email");
            }
        }

        return null;
    }
}