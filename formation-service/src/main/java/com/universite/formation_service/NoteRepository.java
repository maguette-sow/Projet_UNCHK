package com.universite.formation_service;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    // SRP & ISP : Méthode ciblée pour récupérer le carnet de notes d'un étudiant spécifique
    List<Note> findByEtudiantId(Long etudiantId);

    // Récupérer toutes les notes d'une matière spécifique (pour les statistiques de la formation)
    List<Note> findByCodeMatiere(String codeMatiere);
}

