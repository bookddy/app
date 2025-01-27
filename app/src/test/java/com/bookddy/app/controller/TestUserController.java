package com.bookddy.app.controller;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.bookddy.app.configuration.TestSecurityConfig;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(UserController.class)
@Import(TestSecurityConfig.class)
@ActiveProfiles("test")
public class TestUserController {
    
    @Autowired
    private MockMvc mvc;
    // private ObjectMapper mapper;
    
    @MockitoBean
    private UserService userService;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    static final String VALID_REGISTRATION = "{\"name\":\"test\", \"email\":\"test\", \"username\":\"test\",\"password\":\"test\"}";
    
    @Test
    @DisplayName("Test valid user returns 200")
    public void shouldCreateUserWithSuccess() {
        // Implement this
    }
}

