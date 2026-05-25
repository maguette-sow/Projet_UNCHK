package com.universite.budget_service;


import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "budgets")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer anneeFiscale;

    @Column(nullable = false)
    private BigDecimal montantAlloue;

    @Column(nullable = false)
    private BigDecimal montantDepense;

    private String descriptionAllocation;

    public Budget() {}

    public Budget(Long id, Integer anneeFiscale, BigDecimal montantAlloue, BigDecimal montantDepense, String descriptionAllocation) {
        this.id = id;
        this.anneeFiscale = anneeFiscale;
        this.montantAlloue = montantAlloue;
        this.montantDepense = montantDepense;
        this.descriptionAllocation = descriptionAllocation;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getAnneeFiscale() { return anneeFiscale; }
    public void setAnneeFiscale(Integer anneeFiscale) { this.anneeFiscale = anneeFiscale; }
    public BigDecimal getMontantAlloue() { return montantAlloue; }
    public void setMontantAlloue(BigDecimal montantAlloue) { this.montantAlloue = montantAlloue; }
    public BigDecimal getMontantDepense() { return montantDepense; }
    public void setMontantDepense(BigDecimal montantDepense) { this.montantDepense = montantDepense; }
    public String getDescriptionAllocation() { return descriptionAllocation; }
    public void setDescriptionAllocation(String descriptionAllocation) { this.descriptionAllocation = descriptionAllocation; }
}

