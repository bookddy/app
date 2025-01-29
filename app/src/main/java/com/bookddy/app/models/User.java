package com.bookddy.app.models;

import java.util.UUID;

import jakarta.persistence.Table;

@Table(name = "user")
public class User {

    private UUID uuid;
    private String name;
    private String username;
    private String email;
    private String password;

    public User(UUID uuid, String name, String username, String email, String password) {
        this.uuid = uuid;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
