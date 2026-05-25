package com.universite.utilisateur_service;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    // Cette méthode permettra de vérifier si un email existe déjà (Règle métier du SRP)
    Optional<Utilisateur> findByEmail(String email);

    // Cette méthode sera cruciale plus tard pour l'authentification
    boolean existsByEmail(String email);
}

