package com.bookddy.app.controller.ResponseDto;
import java.time.LocalDateTime;

public record TokenDto(
        String accessToken,
        String refreshToken,
        LocalDateTime expiresIn
) {
}
