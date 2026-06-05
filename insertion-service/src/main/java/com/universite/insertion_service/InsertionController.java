package com.universite.insertion_service;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/insertion")
public class InsertionController {

    private final InsertionService service;

    public InsertionController(InsertionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<InsertionProfessionnelle> ajouter(@RequestBody InsertionProfessionnelle ins) {
        return new ResponseEntity<>(service.enregistrerSuivi(ins), HttpStatus.CREATED);
    }

    @GetMapping("/statistiques")
    public ResponseEntity<List<InsertionProfessionnelle>> listerParStatut(@RequestParam String statut) {
        return ResponseEntity.ok(service.obtenirParStatut(statut));
    }
}

