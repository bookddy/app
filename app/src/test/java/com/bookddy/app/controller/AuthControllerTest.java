package com.bookddy.app.controller;

import com.bookddy.app.controllers.RequestDtos.SignInDto;
import com.bookddy.app.controllers.ResponseDtos.TokenDto;
import com.bookddy.app.service.JWTService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.time.Month;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Mock
  private JWTService JWTService;

  String EMAIL = "test@email.com";
  String PASSWORD = "password";
  String SUCCESSMESSAGE = "Successfully sign in";
  String ACCESSTOKEN = "asdsdada";
  String REFRESHTOKEN = "DDFFSS";
  LocalDateTime EXPIRATION = LocalDateTime.of(2020, Month.JANUARY, 18, 2, 0);


  @Test
  public void SignInSuccess(){
    SignInDto request = new SignInDto(EMAIL, PASSWORD);
    TokenDto tokens = new TokenDto(ACCESSTOKEN, REFRESHTOKEN, EXPIRATION);
    when( JWTService.signIn(request.email, request.password)).thenReturn(tokens);
    mockMvc.perform(
        post("api/v1/auth/signin").content(asJsonString(request))
            .contentType(MediaType.APPLICATION_JSON)
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.accessToken", is(tokens.accessToken())))
            .andExpect(jsonPath("$.refreshToken", is(tokens.refreshToken())))
            .andExpect(jsonPath("$.status", is(200)))
    );

  }
}
