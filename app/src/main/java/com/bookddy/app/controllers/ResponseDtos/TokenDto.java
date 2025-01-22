package com.bookddy.app.controllers.ResponseDtos;

import java.time.LocalDateTime;

public record TokenDto(
        String accessToken,
        String refreshToken,
        LocalDateTime expiresIn
) {
}
