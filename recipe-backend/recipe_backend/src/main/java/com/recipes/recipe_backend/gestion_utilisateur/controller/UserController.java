package com.example.gestion_utilisateur.controller;

import com.example.gestion_utilisateur.entity.User;
import com.example.gestion_utilisateur.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // -------------------- REGISTER --------------------
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    // -------------------- LOGIN --------------------
    @PostMapping("/login")
    public User login(@RequestParam String email) {
        return userService.login(email);
    }

    // -------------------- UPDATE PROFILE --------------------
    @PutMapping("/{id}")
    public User updateProfile(@PathVariable Long id, @RequestBody User user) {
        return userService.updateProfile(id, user);
    }

    // -------------------- DELETE ACCOUNT --------------------
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Long id) {
        userService.deleteAccount(id);
    }

}

