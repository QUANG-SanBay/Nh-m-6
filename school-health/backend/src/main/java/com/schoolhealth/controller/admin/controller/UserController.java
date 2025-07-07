package com.schoolhealth.controller.admin.controller;

import com.schoolhealth.controller.admin.model.User;
import com.schoolhealth.controller.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users → trả về danh sách user
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
