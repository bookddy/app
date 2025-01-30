package com.bookddy.app.controller.requestDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDto(@Email(message = "Email is not valid")
                        @NotBlank(message = "Email is required")
                        String email,
                        @Size(max = 35, message = "Password must be at most 35 characters")
                        @NotBlank(message = "Username is required")
                        String username,
                        @Size(max = 200, message = "Password must be at most 200 characters")
                        @NotBlank(message = "Name is required")
                        String name,
                        @NotBlank(message = "Password is required")
                        @Size(min = 8, message = "Password must be at least 8 characters")
                        String password ){
}
