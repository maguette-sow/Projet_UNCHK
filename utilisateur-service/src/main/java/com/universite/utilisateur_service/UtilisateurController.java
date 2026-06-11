package com.universite.utilisateur_service;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurService service;

    // DIP : Injection du composant métier via le constructeur
    public UtilisateurController(UtilisateurService service) {
        this.service = service;
    }

    /**
     * POST http://localhost:8081/api/utilisateurs
     * Enregistrer un nouvel utilisateur
     */
    @PostMapping
    public ResponseEntity<?> enregistrer(@RequestBody Utilisateur utilisateur) {
        try {
            Utilisateur cree = service.creerUtilisateur(utilisateur);
            return new ResponseEntity<>(cree, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Respect du SRP : Gestion propre des retours d'erreurs métiers
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * GET http://localhost:8081/api/utilisateurs
     * Récupérer la liste complète
     */
    @GetMapping
    public ResponseEntity<?> listerTousLesUtilisateurs() {
        try {
            return ResponseEntity.ok(service.recupererTousLesUtilisateurs());
        } catch (Exception e) {
            // Empêche l'erreur 500 et renvoie un tableau vide avec un avertissement propre
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur interne lors de la lecture des profils : " + e.getMessage());
        }
    }


    /**
     * GET http://localhost:8081/api/utilisateurs/{id}
     * Trouver un utilisateur par son identifiant
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> trouverParId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.recupererParId(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

