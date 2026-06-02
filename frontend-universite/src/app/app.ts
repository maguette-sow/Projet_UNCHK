import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionUtilisateursComponent } from './components/gestion-utilisateurs/gestion-utilisateurs';
import { GestionNotesComponent } from './components/gestion-notes/gestion-notes';
import { GestionCommunicationComponent } from './components/gestion-communication/gestion-communication';
import { GestionBudgetComponent } from './components/gestion-budget/gestion-budget'; // 👈 Import
import { GestionInsertionComponent } from './components/gestion-insertion/gestion-insertion'; // 👈 Import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    GestionUtilisateursComponent,
    GestionNotesComponent,
    GestionCommunicationComponent,
    GestionBudgetComponent,
    GestionInsertionComponent
  ], // 👈 Injections
  template: `
    <div style="max-width: 1250px; margin: 20px auto; padding: 25px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">

      <h1 style="text-align: center; color: #2c3e50; margin-bottom: 25px; border-bottom: 4px solid #34495e; padding-bottom: 15px;">
        Système Éducatif Intégré d'Administration Universitaire (SOLID & Microservices)
      </h1>

      <!-- Menu de Navigation Global complet (5 Modules du Cahier des Charges) -->
      <nav style="display: flex; gap: 5px; margin-bottom: 25px; border-bottom: 2px solid #dee2e6; flex-wrap: wrap;">
        <button (click)="changerOnglet('utilisateurs')" [style.background-color]="ongletActuel === 'utilisateurs' ? '#34495e' : '#e9ecef'" [style.color]="ongletActuel === 'utilisateurs' ? 'white' : '#495057'" style="padding: 10px 15px; border: none; border-radius: 5px 5px 0 0; cursor: pointer; font-weight: bold;">
          👥 Comptes & Profils
        </button>
        <button (click)="changerOnglet('notes')" [style.background-color]="ongletActuel === 'notes' ? '#34495e' : '#e9ecef'" [style.color]="ongletActuel === 'notes' ? 'white' : '#495057'" style="padding: 10px 15px; border: none; border-radius: 5px 5px 0 0; cursor: pointer; font-weight: bold;">
          🎓 Cours & Évaluations
        </button>
        <button (click)="changerOnglet('communication')" [style.background-color]="ongletActuel === 'communication' ? '#34495e' : '#e9ecef'" [style.color]="ongletActuel === 'communication' ? 'white' : '#495057'" style="padding: 10px 15px; border: none; border-radius: 5px 5px 0 0; cursor: pointer; font-weight: bold;">
          📢 Communication & PV
        </button>
        <button (click)="changerOnglet('budget')" [style.background-color]="ongletActuel === 'budget' ? '#34495e' : '#e9ecef'" [style.color]="ongletActuel === 'budget' ? 'white' : '#495057'" style="padding: 10px 15px; border: none; border-radius: 5px 5px 0 0; cursor: pointer; font-weight: bold;">
          💰 Pilotage Budgétaire
        </button>
        <button (click)="changerOnglet('insertion')" [style.background-color]="ongletActuel === 'insertion' ? '#34495e' : '#e9ecef'" [style.color]="ongletActuel === 'insertion' ? 'white' : '#495057'" style="padding: 10px 15px; border: none; border-radius: 5px 5px 0 0; cursor: pointer; font-weight: bold;">
          📊 Insertion & Statistiques
        </button>
      </nav>

      <!-- Zone de Rendu Dynamique Isolée (Respect d'OCP) -->
      <div style="background-color: white; padding: 20px; border-radius: 6px; border: 1px solid #dee2e6;">
        @if (ongletActuel === 'utilisateurs') { <app-gestion-utilisateurs></app-gestion-utilisateurs> }
        @if (ongletActuel === 'notes') { <app-gestion-notes></app-gestion-notes> }
        @if (ongletActuel === 'communication') { <app-gestion-communication></app-gestion-communication> }
        @if (ongletActuel === 'budget') { <app-gestion-budget></app-gestion-budget> }
        @if (ongletActuel === 'insertion') { <app-gestion-insertion></app-gestion-insertion> }
      </div>

    </div>
  `
})
export class AppComponent {
  title = 'frontend-universite';
  ongletActuel = 'utilisateurs';

  changerOnglet(nomOnglet: string): void {
    this.ongletActuel = nomOnglet;
  }
}
