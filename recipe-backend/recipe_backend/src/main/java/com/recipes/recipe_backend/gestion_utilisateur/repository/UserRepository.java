package com.example.gestion_utilisateur.repository;

import com.example.gestion_utilisateur.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Tu peux ajouter des méthodes personnalisées si besoin, par ex :
    User findByFirstname(String firstname);
    User findByLastname(String lastname);
    User findByEmail(String email);
    User findByRole(String role);
}
