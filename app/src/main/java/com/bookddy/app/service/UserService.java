package com.bookddy.app.service;

import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.bookddy.app.model.User;
import com.bookddy.app.repository.UserRepo;

@Service
public class UserService {
  private final UserRepo userRepo;
  private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

  public UserService(UserRepo userRepo) {
    this.userRepo = userRepo;
  }

  public User createUser(String name, String username, String email, String password) {
    UUID generatedId = UUID.randomUUID();
    String encodedPassword = encoder.encode(password);
    User user = userRepo.save(new User(
        generatedId,
        name,
        username,
        email,
        encodedPassword,
        "jkljlk.com",
        "akskajsla",
        "user"
    ));
    return user;
  }
}
