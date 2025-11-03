package com.example.gestion_utilisateur.service;

import com.example.gestion_utilisateur.entity.User;
import com.example.gestion_utilisateur.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // -------------------- register() --------------------
    public User register(User user) {
        // Vérifie si l'email existe déjà
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email déjà utilisé !");
        }
        // On peut définir un rôle par défaut si non précisé
        if (user.getRole() == null) {
            user.setRole("Default");
        }
        // Sauvegarde en base
        return userRepository.save(user);
    }

    // -------------------- login() --------------------
    public User login(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    // -------------------- updateProfile() --------------------
    public User updateProfile(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Mise à jour des champs
        existingUser.setFirstname(updatedUser.getFirstname());
        existingUser.setLastname(updatedUser.getLastname());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setRole(updatedUser.getRole());

        return userRepository.save(existingUser);
    }

    // -------------------- deleteAccount() --------------------
    public void deleteAccount(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur introuvable !");
        }
        userRepository.deleteById(id);
    }

}

