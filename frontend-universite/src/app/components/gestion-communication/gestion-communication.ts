import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationService } from '../../services/communication';

@Component({
  selector: 'app-gestion-communication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-communication.html',
  styleUrl: './gestion-communication.css'
})
export class GestionCommunicationComponent implements OnInit {
  reunions: any[] = [];

  // Modèles de données pour les formulaires
  nouvelleReunion = { ordreDuJour: '', dateHeure: '', lieuOuLien: '' };
  nouveauPV = { titre: '', fichierUrl: '/stockage/pdf/pv_officiel.pdf', createurId: 1 };

  reunionACloturerId: number | null = null;

  constructor(private commService: CommunicationService) {}

  ngOnInit(): void {
    this.rafraichirListe();
  }

  rafraichirListe(): void {
    this.commService.getReunions().subscribe({
      next: (data) => this.reunions = data,
      error: (err) => console.error('Erreur de chargement des réunions', err)
    });
  }

  planifier(): void {
    this.commService.planifierReunion(this.nouvelleReunion).subscribe({
      next: () => {
        alert('Réunion administrative planifiée avec succès !');
        this.rafraichirListe();
        this.nouvelleReunion = { ordreDuJour: '', dateHeure: '', lieuOuLien: '' };
      },
      error: (err) => alert('Erreur : ' + err.message)
    });
  }

  ouvrirZoneCloture(id: number): void {
    this.reunionACloturerId = id;
  }

  cloturer(): void {
    if (this.reunionACloturerId) {
      this.commService.cloturerReunion(this.reunionACloturerId, this.nouveauPV).subscribe({
        next: () => {
          alert('Réunion clôturée et Procès-Verbal archivé !');
          this.reunionACloturerId = null;
          this.rafraichirListe();
          this.nouveauPV = { titre: '', fichierUrl: '/stockage/pdf/pv_officiel.pdf', createurId: 1 };
        },
        error: (err) => alert('Erreur de clôture : ' + err.message)
      });
    }
  }
}

export class GestionCommunication {
}
