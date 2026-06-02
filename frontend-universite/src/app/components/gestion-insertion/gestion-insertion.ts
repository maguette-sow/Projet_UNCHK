import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsertionService } from '../../services/insertion';

@Component({
  selector: 'app-gestion-insertion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-insertion.html',
  styleUrl: './gestion-insertion.css'
})
export class GestionInsertionComponent {

  insertion = { etudiantId: null, statutActuel: 'EN_POSTE', intitulePoste: '', entreprise: '', salaireAnnuelBrut: 0, dateEmbauche: '' };
  diplomes: any[] = [];
  filtreStatut = 'EN_POSTE';

  constructor(private insertionService: InsertionService) {}

  enregistrerSuivi(): void {
    this.insertionService.enregistrer(this.insertion).subscribe({
      next: () => {
        alert('Situation d\'insertion professionnelle enregistrée pour ce diplômé !');
        this.insertion = { etudiantId: null, statutActuel: 'EN_POSTE', intitulePoste: '', entreprise: '', salaireAnnuelBrut: 0, dateEmbauche: '' };
      },
      error: (err) => alert('Erreur : ' + err.message)
    });
  }

  chargerStatistiques(): void {
    this.insertionService.getStatistiques(this.filtreStatut).subscribe({
      next: (data) => this.diplomes = data,
      error: (err) => console.error('Erreur statistiques', err)
    });
  }
}

