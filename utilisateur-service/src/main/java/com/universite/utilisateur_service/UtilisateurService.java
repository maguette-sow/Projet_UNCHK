package com.universite.utilisateur_service;


import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UtilisateurService {

    private final UtilisateurRepository repository;

    // DIP : Injection par constructeur (recommandé par Spring et SOLID)
    public UtilisateurService(UtilisateurRepository repository) {
        this.repository = repository;
    }

    /**
     * Règle métier : Créer un nouvel utilisateur s'il n'existe pas déjà.
     */
    public Utilisateur creerUtilisateur(Utilisateur utilisateur) {
        // Validation SRP : Un email doit être unique dans le système
        if (repository.existsByEmail(utilisateur.getEmail())) {
            throw new IllegalArgumentException("Erreur : Un utilisateur existe déjà avec cet email !");
        }

        // Simulation de chiffrement (À remplacer plus tard par Spring Security)
        // Ne jamais stocker de mots de passe en clair en base de données
        utilisateur.setMotDePasse("ENCRYPTED_" + utilisateur.getMotDePasse());

        return repository.save(utilisateur);
    }

    /**
     * Récupérer tous les utilisateurs (Pour l'administration)
     */
    public List<Utilisateur> recupererTousLesUtilisateurs() {
        return repository.findAll();
    }

    /**
     * Récupérer un utilisateur par son identifiant unique
     */
    public Utilisateur recupererParId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec l'ID : " + id));
    }
}

