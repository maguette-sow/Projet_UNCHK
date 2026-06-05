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

  // 🌟 RECTIFICATION : Déclaration explicite de l'attribut exigé par la base de données
  budgetData = {
    anneeFiscale: 2026,
    montantAlloue: 0,
    montantDepense: 0,
    descriptionAllocation: ''
  };

  depenseData = { annee: 2026, montant: 0 };

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {}

  initialiserEnveloppe(): void {
    this.budgetService.allouer(this.budgetData).subscribe({
      next: () => {
        alert('Enveloppe budgétaire universitaire initialisée avec succès !');
        this.budgetData = { anneeFiscale: 2026, montantAlloue: 0, montantDepense: 0, descriptionAllocation: '' };
      },
      error: (err) => alert('Erreur : ' + err.message)
    });
  }

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
