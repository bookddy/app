package com.bookddy.app.model.mappers;

import com.bookddy.app.model.User;
import com.bookddy.app.model.dao.UserDAO;

public class UserMapper {
    public static User toUser(UserDAO userDAO) {
        return new User(userDAO.getUsername(), userDAO.getPassword(), userDAO.getEmail(), userDAO.getRole());
    }
}
