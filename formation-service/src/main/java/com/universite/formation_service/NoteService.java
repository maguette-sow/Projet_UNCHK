package com.universite.formation_service;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository repository;
    private final RestClient restClient;

    // DIP : Injection par constructeur des dépendances nécessaires
    public NoteService(NoteRepository repository, RestClient restClient) {
        this.repository = repository;
        this.restClient = restClient;
    }

    /**
     * Règle métier enrichie : Attribuer une note après vérification de l'existence de l'étudiant
     */
    public Note attribuerNote(Note note) {
        // 1. Validation du barème (SRP)
        if (note.getValeurNote() < 0 || note.getValeurNote() > 20) {
            throw new IllegalArgumentException("Erreur : La note doit être impérativement comprise entre 0 et 20 !");
        }

        // 2. Communication synchrone stricte avec le Microservice Utilisateur (Port 8081)
        try {
            ResponseEntity<Void> reponse = restClient.get()
                    .uri("http://localhost:8081/api/utilisateurs/" + note.getEtudiantId())
                    .retrieve()
                    .toBodilessEntity(); // Récupère directement la réponse HTTP

            // Si le code statut n'est pas 200 OK, on refuse l'enregistrement
            if (reponse.getStatusCode() != HttpStatus.OK) {
                throw new IllegalArgumentException("L'étudiant avec l'ID " + note.getEtudiantId() + " n'existe pas.");
            }

        } catch (HttpClientErrorException.NotFound e) {
            // Intercepte spécifiquement l'erreur 404 renvoyée par le port 8081
            throw new IllegalArgumentException("Erreur : L'étudiant avec l'ID " + note.getEtudiantId() + " n'existe pas dans le système !");
        } catch (Exception e) {
            // Intercepte les autres erreurs (ex: si le serveur 8081 est éteint)
            throw new IllegalArgumentException("Validation impossible : Le service utilisateur ne répond pas. " + e.getMessage());
        }

        // 3. Persistance uniquement si aucune exception n'a été levée ci-dessus
        return repository.save(note);
    }

    public List<Note> recupererNotesEtudiant(Long etudiantId) {
        return repository.findByEtudiantId(etudiantId);
    }

    public List<Note> recupererNotesParMatiere(String codeMatiere) {
        return repository.findByCodeMatiere(codeMatiere);
    }
}
