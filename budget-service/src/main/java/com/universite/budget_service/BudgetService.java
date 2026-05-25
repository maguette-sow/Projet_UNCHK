package com.universite.budget_service;


import org.springframework.stereotype.Service;

@Service
public class BudgetService {

    private final BudgetRepository repository;

    public BudgetService(BudgetRepository repository) {
        this.repository = repository;
    }

    public Budget allouerBudget(Budget budget) {
        budget.setMontantDepense(java.math.BigDecimal.ZERO);
        return repository.save(budget);
    }

    public Budget enregistrerDepense(Integer annee, java.math.BigDecimal montantDepense) {
        Budget budget = repository.findByAnneeFiscale(annee)
                .orElseThrow(() -> new RuntimeException("Erreur : Aucun budget trouvé pour l'année " + annee));

        java.math.BigDecimal nouveauTotal = budget.getMontantDepense().add(montantDepense);

        // Règle métier stricte (SRP)
        if (nouveauTotal.compareTo(budget.getMontantAlloue()) > 0) {
            throw new IllegalArgumentException("Dépense refusée : Le budget alloué pour l'année " + annee + " serait dépassé !");
        }

        budget.setMontantDepense(nouveauTotal);
        return repository.save(budget);
    }
}
