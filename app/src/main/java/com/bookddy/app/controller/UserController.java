package com.bookddy.app.controller;

import java.net.URI;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.bookddy.app.controller.requestDto.RegisterDto;
import com.bookddy.app.model.User;
import com.bookddy.app.service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterDto registerBody) {
    User user = userService.createUser(
        registerBody.name(),
        registerBody.username(),
        registerBody.email(),
        registerBody.password()
    );
    UUID userId = user.getId();
    return ResponseEntity
        .created(URI.create("user/" + userId))
        .build();
  }
}
