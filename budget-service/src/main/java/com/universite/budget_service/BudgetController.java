package com.universite.budget_service;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    private final BudgetService service;

    public BudgetController(BudgetService service) {
        this.service = service;
    }

    @PostMapping({"", "/"})
    public ResponseEntity<?> initialiser(@RequestBody Budget budget) {
        try {
            return new ResponseEntity<>(service.allouerBudget(budget), HttpStatus.CREATED);
        } catch (Exception e) {
            // 🌟 Capture le message exact (ex: contrainte de clé, champ null...) et le renvoie à Angular
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur base de données : " + e.getMessage());
        }
    }


    @PutMapping("/{annee}/depenser")
    public ResponseEntity<?> depenser(@PathVariable Integer annee, @RequestParam BigDecimal montant) {
        try {
            return ResponseEntity.ok(service.enregistrerDepense(annee, montant));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            // 🌟 Évite l'erreur 500 globale et renvoie un message propre à Angular
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erreur : Aucun budget initial alloué pour l'année " + annee);
        }
    }
}

