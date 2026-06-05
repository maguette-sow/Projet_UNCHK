package com.universite.communication_service;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/communication")
public class CommunicationController {

    private final CommunicationService service;

    // DIP : Injection par constructeur
    public CommunicationController(CommunicationService service) {
        this.service = service;
    }

    /**
     * POST http://localhost:8083/api/communication/reunions
     * Planifier une nouvelle réunion
     */
    @PostMapping("/reunions")
    public ResponseEntity<Reunion> planifier(@RequestBody Reunion reunion) {
        return new ResponseEntity<>(service.planifierReunion(reunion), HttpStatus.CREATED);
    }

    /**
     * POST http://localhost:8083/api/communication/documents
     * Enregistrer un document (Note de service, courrier)
     */
    @PostMapping("/documents")
    public ResponseEntity<Document> enregistrerDoc(@RequestBody Document doc) {
        return new ResponseEntity<>(service.enregistrerDocument(doc), HttpStatus.CREATED);
    }

    /**
     * PUT http://localhost:8083/api/communication/reunions/{id}/cloturer
     * Clôturer une réunion en y ajoutant le PV / Compte-rendu
     */
    @PutMapping("/reunions/{id}/cloturer")
    public ResponseEntity<?> cloturer(@PathVariable Long id, @RequestBody Document compteRendu) {
        try {
            Reunion finie = service.cloturerReunion(id, compteRendu);
            return ResponseEntity.ok(finie);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * GET http://localhost:8083/api/communication/reunions
     */
    @GetMapping("/reunions")
    public ResponseEntity<List<Reunion>> listerReunions() {
        return ResponseEntity.ok(service.obtenirToutesLesReunions());
    }
}

