import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormationService } from '../../services/formation';

@Component({
  selector: 'app-gestion-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-notes.html',
  styleUrl: './gestion-notes.css'
})
export class GestionNotesComponent {

  // Modèle pour l'attribution d'une note
  noteData = {
    valeurNote: 0,
    appreciation: '',
    etudiantId: null,
    codeMatiere: ''
  };

  bulletin: any[] = [];
  rechercheId: number | null = null;

  constructor(private formationService: FormationService) {}

  sauvegarderNote(): void {
    this.formationService.attribuerNote(this.noteData).subscribe({
      next: () => {
        alert('Note enregistrée avec succès !');
        this.noteData = { valeurNote: 0, appreciation: '', etudiantId: null, codeMatiere: '' };
      },
      error: (err) => alert(err.error) // Affiche l'erreur du backend (ex: ID 999 n'existe pas)
    });
  }

  consulterBulletin(): void {
    if (this.rechercheId) {
      this.formationService.getNotesEtudiant(this.rechercheId).subscribe({
        next: (data) => this.bulletin = data,
        error: (err) => console.error('Erreur bulletin', err)
      });
    }
  }
}

