package com.universite.insertion_service;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "insertions_professionnelles")
public class InsertionProfessionnelle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long etudiantId; // Lien faible SOLID vers l'ID utilisateur

    @Column(nullable = false)
    private String statutActuel; // EN_POSTE, EN_RECHERCHE, POURSUITE_ETUDES

    private String intitulePoste;
    private String entreprise;
    private BigDecimal salaireAnnuelBrut;
    private LocalDate dateEmbauche;

    public InsertionProfessionnelle() {}

    public InsertionProfessionnelle(Long id, Long etudiantId, String statutActuel, String intitulePoste, String entreprise, BigDecimal salaireAnnuelBrut, LocalDate dateEmbauche) {
        this.id = id;
        this.etudiantId = etudiantId;
        this.statutActuel = statutActuel;
        this.intitulePoste = intitulePoste;
        this.entreprise = entreprise;
        this.salaireAnnuelBrut = salaireAnnuelBrut;
        this.dateEmbauche = dateEmbauche;
    }

    // Getters et Setters standard
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }
    public String getStatutActuel() { return statutActuel; }
    public void setStatutActuel(String statutActuel) { this.statutActuel = statutActuel; }
    public String getIntitulePoste() { return intitulePoste; }
    public void setIntitulePoste(String intitulePoste) { this.intitulePoste = intitulePoste; }
    public String getEntreprise() { return entreprise; }
    public void setEntreprise(String entreprise) { this.entreprise = entreprise; }
    public BigDecimal getSalaireAnnuelBrut() { return salaireAnnuelBrut; }
    public void setSalaireAnnuelBrut(BigDecimal salaireAnnuelBrut) { this.salaireAnnuelBrut = salaireAnnuelBrut; }
    public LocalDate getDateEmbauche() { return dateEmbauche; }
    public void setDateEmbauche(LocalDate dateEmbauche) { this.dateEmbauche = dateEmbauche; }
}
