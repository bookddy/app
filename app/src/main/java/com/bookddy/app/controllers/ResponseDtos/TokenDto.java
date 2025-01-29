package com.bookddy.app.controllers.responseDtos;

import java.time.LocalDateTime;

public record TokenDto(
        String accessToken,
        String refreshToken,
        LocalDateTime expiresIn
) {
}
