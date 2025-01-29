package com.bookddy.app.services;

import java.util.UUID;
import org.springframework.stereotype.Service;
import com.bookddy.app.models.User;
import com.bookddy.app.repositories.UserRepo;

@Service
public class UserService {
    
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    public User createUser(String name, String username, String email, String password){
        UUID generatedId = UUID.randomUUID();
        User user = userRepo.save(new User(
            generatedId,
            name,
            username, 
            email,
            password)
        );
        return user;
    }
}
