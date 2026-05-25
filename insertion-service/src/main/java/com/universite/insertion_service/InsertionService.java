package com.universite.insertion_service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsertionService {

    private final InsertionRepository repository;

    public InsertionService(InsertionRepository repository) {
        this.repository = repository;
    }

    public InsertionProfessionnelle enregistrerSuivi(InsertionProfessionnelle insertion) {
        return repository.save(insertion);
    }

    public List<InsertionProfessionnelle> obtenirParStatut(String statut) {
        return repository.findByStatutActuel(statut);
    }
}
