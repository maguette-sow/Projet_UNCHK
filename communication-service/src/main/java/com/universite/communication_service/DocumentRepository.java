package com.universite.communication_service;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    // ISP : Requête ciblée pour l'archivage par type (ex: retrouver toutes les NOTES_SERVICE)
    List<Document> findByTypeDocument(String typeDocument);
}
