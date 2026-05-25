package com.universite.insertion_service;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InsertionRepository extends JpaRepository<InsertionProfessionnelle, Long> {
    List<InsertionProfessionnelle> findByStatutActuel(String statut);
}
