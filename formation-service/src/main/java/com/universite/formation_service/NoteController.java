package com.universite.formation_service;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService service;

    // DIP : Injection par constructeur
    public NoteController(NoteService service) {
        this.service = service;
    }

    /**
     * POST http://localhost:8082/api/notes
     * Attribuer une note à un étudiant
     */
    @PostMapping
    public ResponseEntity<?> enregistrerNote(@RequestBody Note note) {
        try {
            Note cree = service.attribuerNote(note);
            return new ResponseEntity<>(cree, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // SRP : Gestion de l'erreur métier (note hors barème [0,20])
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * GET http://localhost:8082/api/notes/etudiant/{etudiantId}
     * Récupérer le bulletin de notes d'un étudiant
     */
    @GetMapping("/etudiant/{etudiantId}")
    public ResponseEntity<List<Note>> obtenirNotesEtudiant(@PathVariable Long etudiantId) {
        return ResponseEntity.ok(service.recupererNotesEtudiant(etudiantId));
    }

    /**
     * GET http://localhost:8082/api/notes/matiere/{codeMatiere}
     * Récupérer toutes les notes d'une matière
     */
    @GetMapping("/matiere/{codeMatiere}")
    public ResponseEntity<List<Note>> obtenirNotesParMatiere(@PathVariable String codeMatiere) {
        return ResponseEntity.ok(service.recupererNotesParMatiere(codeMatiere));
    }
}

