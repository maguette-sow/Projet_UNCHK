package com.universite.utilisateur_service;

import jakarta.persistence.*;

@Entity
@Table(name = "utilisateurs")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String motDePasse;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private boolean statutCompte = true;

    // 🌟 EXTENSIONS SPECIFIQUES AU MODULE 5 (CAHIER DES CHARGES UNCHK)
    private String ine;
    private String dateNaissance;
    private String formation;
    private String promo;
    private Integer anneeDebut;
    private Integer anneeSortie;
    private String diplomesObtenus;
    private String EastonFormations; // Mappé sur autresFormations côté Front

    // 1. Constructeur vide obligatoire pour JPA/Hibernate
    public Utilisateur() {
    }

    // 2. Constructeur complet mis à jour
    public Utilisateur(Long id, String nom, String prenom, String email, String motDePasse, Role role, boolean statutCompte,
                       String ine, String dateNaissance, String formation, String promo, Integer anneeDebut, Integer anneeSortie,
                       String diplomesObtenus, String EastonFormations) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.role = role;
        this.statutCompte = statutCompte;
        this.ine = ine;
        this.dateNaissance = dateNaissance;
        this.formation = formation;
        this.promo = promo;
        this.anneeDebut = anneeDebut;
        this.anneeSortie = anneeSortie;
        this.diplomesObtenus = diplomesObtenus;
        this.EastonFormations = EastonFormations;
    }

    // 3. Getters et Setters standards existants
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public boolean isStatutCompte() { return statutCompte; }
    public void setStatutCompte(boolean statutCompte) { this.statutCompte = statutCompte; }

    // 🌟 4. Getters et Setters des extensions académiques (Supprime les "En attente")
    public String getIne() { return ine; }
    public void setIne(String ine) { this.ine = ine; }

    public String getDateNaissance() { return dateNaissance; }
    public void setDateNaissance(String dateNaissance) { this.dateNaissance = dateNaissance; }

    public String getFormation() { return formation; }
    public void setFormation(String formation) { this.formation = formation; }

    public String getPromo() { return promo; }
    public void setPromo(String promo) { this.promo = promo; }

    public Integer getAnneeDebut() { return anneeDebut; }
    public void setAnneeDebut(Integer anneeDebut) { this.anneeDebut = anneeDebut; }

    public Integer getAnneeSortie() { return anneeSortie; }
    public void setAnneeSortie(Integer anneeSortie) { this.anneeSortie = anneeSortie; }

    public String getDiplomesObtenus() { return diplomesObtenus; }
    public void setDiplomesObtenus(String diplomesObtenus) { this.diplomesObtenus = diplomesObtenus; }

    public String getAutresFormations() { return EastonFormations; }
    public void setAutresFormations(String autresFormations) { this.EastonFormations = autresFormations; }
}
