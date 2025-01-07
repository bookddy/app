package com.bookddy.app.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class User implements UserDetails {

        private String username;
        private String password;
        private String email;
        private String role;

        public User(String username, String password, String email, String role) {
            this.username = username;
            this.password = password;
            this.email = email;
            this.role = role;
        }

        public User() {
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getEmail() {
            return email;
        }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.equals("ADMIN") ? Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")) :
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

        @Override
        public String getPassword() {
            return password;
        }

        @Override
        public String getUsername() {
            return username;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
}
