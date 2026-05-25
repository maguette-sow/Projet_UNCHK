package com.universite.communication_service;


import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommunicationService {

    private final ReunionRepository reunionRepository;
    private final DocumentRepository documentRepository;

    // DIP : Injection des deux abstractions nécessaires
    public CommunicationService(ReunionRepository reunionRepository, DocumentRepository documentRepository) {
        this.reunionRepository = reunionRepository;
        this.documentRepository = documentRepository;
    }

    /**
     * Règle métier : Planifier une nouvelle réunion administrative
     */
    public Reunion planifierReunion(Reunion reunion) {
        reunion.setStatut("PLANIFIEE"); // Statut initial par défaut
        return reunionRepository.save(reunion);
    }

    /**
     * Règle métier : Enregistrer un document officiel (Courrier, Note)
     */
    public Document enregistrerDocument(Document doc) {
        // SRP : Génération d'une référence d'archive unique réglementaire automatique
        String prefixe = doc.getTypeDocument().substring(0, 3).toUpperCase();
        doc.setReferenceArchive(prefixe + "-" + System.currentTimeMillis());

        return documentRepository.save(doc);
    }

    /**
     * Règle métier : Clôturer une réunion en lui associant son Compte-Rendu (PV)
     */
    public Reunion cloturerReunion(Long reunionId, Document compteRendu) {
        Reunion reunion = reunionRepository.findById(reunionId)
                .orElseThrow(() -> new RuntimeException("Erreur : Réunion introuvable avec l'ID : " + reunionId));

        compteRendu.setTypeDocument("COMPTE_RENDU");
        Document pvEnregistre = enregistrerDocument(compteRendu);

        reunion.setStatut("TERMINEE");
        reunion.setCompteRendu(pvEnregistre); // Association de la relation 1-to-1

        return reunionRepository.save(reunion);
    }

    public List<Reunion> obtenirToutesLesReunions() {
        return reunionRepository.findAll();
    }

    public List<Document> obtenirTousLesDocuments() {
        return documentRepository.findAll();
    }
}

