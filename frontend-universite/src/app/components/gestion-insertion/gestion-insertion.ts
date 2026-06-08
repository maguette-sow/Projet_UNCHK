import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsertionService } from '../../services/insertion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-gestion-insertion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-insertion.html',
  styleUrl: './gestion-insertion.css'
})
export class GestionInsertionComponent implements OnInit {

  // Formulaire Insertion Professionnelle (Mis à jour avec AUTO_EMPLOI)
  insertion = { etudiantId: null, statutActuel: 'EN_POSTE', intitulePoste: '', entreprise: '', salaireAnnuelBrut: 0, dateEmbauche: '' };
  diplomes: any[] = [];
  filtreStatut = 'EN_POSTE';

  // 🌟 NOUVEAU : Suivi des étudiants (Registre de contact & Bilan de stage)
  suiviStage = { etudiantId: null, telephone: '', entrepriseStage: '', noteStage: 15, bilan: 'TRES_BIEN' };
  registreContactsStages: any[] = [
    { id: 1, etudiantId: 2, telephone: '+221 77 123 45 67', entrepriseStage: 'Sonatel', noteStage: 16, bilan: 'Excellent / Offre d\'emploi formulée' }
  ];

  // 🌟 NOUVEAU : Base de données Partenariats
  partenaires: any[] = [
    { id: 1, structure: 'Orange Sénégal', convention: 'Convention de Stage & Insertion', filiere: 'Master Ingénierie Logicielle (P8)', statut: 'Actif' },
    { id: 2, structure: 'Tech Solutions SA', convention: 'Immersion Pro & Auto-emploi', filiere: 'Licence / Master Informatique', statut: 'Actif' }
  ];

  constructor(private insertionService: InsertionService) {}

  ngOnInit(): void {}

  enregistrerSuivi(): void {
    this.insertionService.enregistrer(this.insertion).subscribe({
      next: () => {
        alert('Situation d\'insertion professionnelle enregistrée !');
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

  // 🌟 NOUVEAU : Enregistrer un contact et bilan de stage
  ajouterContactStage(): void {
    const nouveauBilan = {
      id: this.registreContactsStages.length + 1,
      etudiantId: this.suiviStage.etudiantId,
      telephone: this.suiviStage.telephone,
      entrepriseStage: this.suiviStage.entrepriseStage,
      noteStage: this.suiviStage.noteStage,
      bilan: this.suiviStage.bilan === 'TRES_BIEN' ? 'Très Satisfaisant' : this.suiviStage.bilan === 'PASSE' ? 'Passable' : 'Insuffisant'
    };
    this.registreContactsStages.unshift(nouveauBilan);
    alert('Contact et Bilan de stage enregistrés avec succès !');
    this.suiviStage = { etudiantId: null, telephone: '', entrepriseStage: '', noteStage: 15, bilan: 'TRES_BIEN' };
  }

  exporterPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('UNIVERSITE CENTRALISEE', 14, 20);
    doc.setFontSize(12);
    doc.text('Observatoire de l\'Insertion Professionnelle - Rapport Officiel', 14, 30);
    doc.text(`Filtre applique : ${this.filtreStatut}`, 14, 38);

    const colonnes = ["ID Alumnus", "Structure d'Accueil", "Fonction Exercee", "Date de Recrutement"];
    const lignes = this.diplomes.map(d => [
      `Etudiant #${d.etudiantId}`,
      d.entreprise || 'N/A',
      d.intitulePoste || 'N/A',
      d.dateEmbauche || 'En attente'
    ]);

    autoTable(doc, {
      head: [colonnes],
      body: lignes,
      startY: 45,
      theme: 'striped',
      headStyles: { fillColor: [19, 141, 117] }
    });

    doc.save(`Rapport_Insertion_${this.filtreStatut}.pdf`);
  }
}
