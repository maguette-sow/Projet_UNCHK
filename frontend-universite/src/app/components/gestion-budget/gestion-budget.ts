import { Component } from '@angular/core';
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
export class GestionBudgetComponent {

  budgetData = { anneeFiscale: 2026, montantAlloue: 0, descriptionAllocation: '' };
  depenseData = { annee: 2026, montant: 0 };

  constructor(private budgetService: BudgetService) {}

  initialiserEnveloppe(): void {
    this.budgetService.allouer(this.budgetData).subscribe({
      next: () => {
        alert('Enveloppe budgétaire universitaire initialisée avec succès !');
        this.budgetData = { anneeFiscale: 2026, montantAlloue: 0, descriptionAllocation: '' };
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
      error: (err) => alert(err.error) // Affiche le blocage SRP du backend si budget dépassé
    });
  }
}
