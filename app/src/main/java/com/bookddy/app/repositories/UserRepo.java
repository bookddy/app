package com.bookddy.app.repositories;
import org.springframework.stereotype.Repository;
import com.bookddy.app.models.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepo extends JpaRepository<User, UUID>{
    User findByUsername(String username);    
}
