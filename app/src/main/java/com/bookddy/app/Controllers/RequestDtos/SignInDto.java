package com.bookddy.app.Controllers.RequestDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignInDto(@Email(message = "Email is not valid")
                        @NotBlank(message = "Email is required")
                        String email,
                        @NotBlank(message = "Password is required")
                        @Size(min = 12, message = "Password must be at least 12 characters")
                         String password ){
}
