import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../services/budget';

@Component({
  selector: 'app-gestion-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-budget.html',
  styleUrl: './gestion-budget.css'
})
export class GestionBudgetComponent implements OnInit {

  // Déclaration explicite de l'attribut exigé par la base de données
  budgetData = {
    anneeFiscale: 2026,
    montantAlloue: 0,
    montantDepense: 0,
    descriptionAllocation: ''
  };

  depenseData = { annee: 2026, montant: 0 };

  courrier = {
    type: 'ARRIVE',
    objet: '',
    expediteurDestinataire: '',
    referenceDoc: ''
  };

  // Tableau de suivi pour le Module 2 (Échappement des apostrophes sécurisé)
  registreDocuments: any[] = [
    { id: 1, type: '📥 ARRIVÉ', objet: 'Demande de subvention recherche', correspondant: 'Ministère de l\'Enseignement Supérieur', ref: 'COURRIER-2026-001', date: '06/06/2026' },
    { id: 2, type: '📄 NOTE INTERNE', objet: 'Modalités d\'organisation de la Promo 8', correspondant: 'Direction des Études', ref: 'NOTE-P8-2026', date: '06/06/2026' }
  ];

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {}

  // Consigner un courrier ou une note de service
  enregistrerCourrier(): void {
    const nouvelEnregistrement = {
      id: this.registreDocuments.length + 1,
      type: this.courrier.type === 'ARRIVE' ? '📥 ARRIVÉ' : this.courrier.type === 'DEPART' ? '🚀 DÉPART' : '📄 NOTE INTERNE',
      objet: this.courrier.objet,
      correspondant: this.courrier.expediteurDestinataire,
      ref: `DOC-2026-00${this.registreDocuments.length + 1}`,
      date: new Date().toLocaleDateString()
    };

    this.registreDocuments.unshift(nouvelEnregistrement);
    alert('Document officiel consigné dans le registre administratif !');

    this.courrier = { type: 'ARRIVE', objet: '', expediteurDestinataire: '', referenceDoc: '' };
  }

  // Initialisation de l'enveloppe via la Gateway
  initialiserEnveloppe(): void {
    this.budgetService.allouer(this.budgetData).subscribe({
      next: () => {
        alert('Enveloppe budgétaire universitaire initialisée avec succès !');
        this.budgetData = { anneeFiscale: 2026, montantAlloue: 0, montantDepense: 0, descriptionAllocation: '' };
      },
      error: (err) => alert('Erreur : ' + err.message)
    });
  }

  // Imputation d'une dépense via la Gateway
  enregistrerFrais(): void {
    this.budgetService.depenser(this.depenseData.annee, this.depenseData.montant).subscribe({
      next: () => {
        alert('Dépense administrative validée et déduite des fonds !');
        this.depenseData = { annee: 2026, montant: 0 };
      },
      error: (err) => alert(err.error || 'Erreur lors du retrait')
    });
  }
}

export class GestionBudget {
}
