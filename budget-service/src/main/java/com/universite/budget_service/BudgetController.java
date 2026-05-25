package com.universite.budget_service;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:4200")
public class BudgetController {

    private final BudgetService service;

    public BudgetController(BudgetService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Budget> initialiser(@RequestBody Budget budget) {
        return new ResponseEntity<>(service.allouerBudget(budget), HttpStatus.CREATED);
    }

    @PutMapping("/{annee}/depenser")
    public ResponseEntity<?> depenser(@PathVariable Integer annee, @RequestParam BigDecimal montant) {
        try {
            return ResponseEntity.ok(service.enregistrerDepense(annee, montant));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

