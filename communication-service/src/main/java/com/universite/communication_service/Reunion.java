package com.universite.communication_service;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reunions")
public class Reunion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ordreDuJour;

    @Column(nullable = false)
    private LocalDateTime dateHeure;

    private String lieuOuLien; // Salle physique ou lien de visioconférence

    private String statut; // PLANIFIEE, EN_COURS, TERMINEE, ANNULEE

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "compte_rendu_id", referencedColumnName = "id")
    private Document compteRendu; // Le PV officiel de la réunion

    public Reunion() {}

    public Reunion(Long id, String ordreDuJour, LocalDateTime dateHeure, String lieuOuLien, String statut, Document compteRendu) {
        this.id = id;
        this.ordreDuJour = ordreDuJour;
        this.dateHeure = dateHeure;
        this.lieuOuLien = lieuOuLien;
        this.statut = statut;
        this.compteRendu = compteRendu;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrdreDuJour() { return ordreDuJour; }
    public void setOrdreDuJour(String ordreDuJour) { this.ordreDuJour = ordreDuJour; }
    public LocalDateTime getDateHeure() { return dateHeure; }
    public void setDateHeure(LocalDateTime dateHeure) { this.dateHeure = dateHeure; }
    public String getLieuOuLien() { return lieuOuLien; }
    public void setLieuOuLien(String lieuOuLien) { this.lieuOuLien = lieuOuLien; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public Document getCompteRendu() { return compteRendu; }
    public void setCompteRendu(Document compteRendu) { this.compteRendu = compteRendu; }
}

