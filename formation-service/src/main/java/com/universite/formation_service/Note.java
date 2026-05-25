package com.universite.formation_service;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double valeurNote; // Ex: 15.5

    private String appreciation;

    private LocalDateTime dateSaisie = LocalDateTime.now();

    // SOLID : Référence distante vers le Microservice Utilisateur (sans couplage d'objet)
    @Column(nullable = false)
    private Long etudiantId;

    @Column(nullable = false)
    private String codeMatiere; // Ex: MATH101, INF201

    // Constructeurs
    public Note() {}

    public Note(Long id, Double valeurNote, String appreciation, Long etudiantId, String codeMatiere) {
        this.id = id;
        this.valeurNote = valeurNote;
        this.appreciation = appreciation;
        this.etudiantId = etudiantId;
        this.codeMatiere = codeMatiere;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getValeurNote() { return valeurNote; }
    public void setValeurNote(Double valeurNote) { this.valeurNote = valeurNote; }

    public String getAppreciation() { return appreciation; }
    public void setAppreciation(String appreciation) { this.appreciation = appreciation; }

    public LocalDateTime getDateSaisie() { return dateSaisie; }
    public void setDateSaisie(LocalDateTime dateSaisie) { this.dateSaisie = dateSaisie; }

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }

    public String getCodeMatiere() { return codeMatiere; }
    public void setCodeMatiere(String codeMatiere) { this.codeMatiere = codeMatiere; }
}
