package com.universite.communication_service;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReunionRepository extends JpaRepository<Reunion, Long> {
    // Permet de lister les réunions selon leur état (ex: voir toutes les réunions PLANIFIEE)
    List<Reunion> findByStatut(String statut);
}

