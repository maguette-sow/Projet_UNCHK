package com.universite.communication_service;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    @Column(nullable = false)
    private String typeDocument; // NOTE_SERVICE, COURRIER_ARRIVEE, COURRIER_DEPART, COMPTE_RENDU

    private String referenceArchive; // Numéro unique d'archivage réglementaire

    private LocalDateTime dateCreation = LocalDateTime.now();

    private String fichierUrl; // Chemin d'accès au fichier PDF stocké

    @Column(nullable = false)
    private Long createurId; // ID de l'utilisateur (Lien faible SOLID)

    // Constructeurs, Getters et Setters standard
    public Document() {}

    public Document(Long id, String titre, String typeDocument, String referenceArchive, String fichierUrl, Long createurId) {
        this.id = id;
        this.titre = titre;
        this.typeDocument = typeDocument;
        this.referenceArchive = referenceArchive;
        this.fichierUrl = fichierUrl;
        this.createurId = createurId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getTypeDocument() { return typeDocument; }
    public void setTypeDocument(String typeDocument) { this.typeDocument = typeDocument; }
    public String getReferenceArchive() { return referenceArchive; }
    public void setReferenceArchive(String referenceArchive) { this.referenceArchive = referenceArchive; }
    public LocalDateTime getDateCreation() { return dateCreation; }
    public void setDateCreation(LocalDateTime dateCreation) { this.dateCreation = dateCreation; }
    public String getFichierUrl() { return fichierUrl; }
    public void setFichierUrl(String fichierUrl) { this.fichierUrl = fichierUrl; }
    public Long getCreateurId() { return createurId; }
    public void setCreateurId(Long createurId) { this.createurId = createurId; }
}
