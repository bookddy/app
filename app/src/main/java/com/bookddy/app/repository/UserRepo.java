package com.bookddy.app.repository;
import org.springframework.stereotype.Repository;
import com.bookddy.app.model.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepo extends JpaRepository<User, UUID>{
    User findByUsername(String username);    
}
