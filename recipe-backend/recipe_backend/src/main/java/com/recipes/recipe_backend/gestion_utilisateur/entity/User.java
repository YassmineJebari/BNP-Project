package com.example.gestion_utilisateur.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "User")  // nom de la table
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String firstname;
    private String lastname;
    private String email;
    private String role;

    // Constructeurs
    public User() {}
    public User(String firstname, String lastname, String email, String role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
