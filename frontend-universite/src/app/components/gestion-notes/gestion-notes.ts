import { Component, OnInit } from '@angular/core';
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
export class GestionNotesComponent implements OnInit {

  // 1. Connexion Backend Existante (Notes & Bulletins)
  noteData = { valeurNote: 0, appreciation: '', etudiantId: null, codeMatiere: '' };
  bulletin: any[] = [];
  rechercheId: number | null = null;

  // 2. Extension Frontend pure (ZÉRO modification du backend formation-service)
  nouvelleFormation = { code: '', intitule: '', dateDebut: '', dateFin: '', typeFormation: 'INITIALE', niveau: 'MASTER', financement: 'PUBLIC', montantFinancement: 0, nombreFormesHomme: 0, nombreFormesFemme: 0 };
  catalogueFormations: any[] = [
    { id: 1, code: 'M1-IL', intitule: 'Master Ingénierie Logicielle (P8)', dateDebut: '2025-10-01', dateFin: '2026-07-31', type: 'INITIALE', niveau: 'MASTER', financement: 'PUBLIC', montant: 0, hommes: 45, femmes: 35 }
  ];

  // Emplois du temps demandés par le cahier des charges
  nouvelEmploi = { jour: 'LUNDI', heure: '10:00 - 12:00', ue: '', formateur: '', typeSeance: 'SYNCHRONE' };
  emploisDuTemps: any[] = [
    { id: 1, jour: 'LUNDI', heure: '10:00 - 12:00', ue: 'Architectures Logicielles Distribuées', formateur: 'Dr. Kane', type: 'SYNCHRONE (Visio)' }
  ];

  // Gestion des catégories de formateurs (Enseignants, Associés, Tuteurs)
  formateurs: any[] = [
    { id: 1, nom: 'Prof. Amadou Diop', categorie: 'ENSEIGNANT', specialite: 'Systèmes Répartis' },
    { id: 2, nom: 'Dr. Fatou Sow', categorie: 'ENSEIGNANT_ASSOCIE', specialite: 'Génie Logiciel Avancé' },
    { id: 3, nom: 'M. Ibrahima Diallo', categorie: 'TUTEUR', specialite: 'Encadrement Projets Master P8' }
  ];

  // Typologie des réunions pédagogiques de l'énoncé
  nouvelleReunionPedago = { typeObj: 'SUIVI_TUTORAT', date: '', description: '' };
  reunionsPedagogiques: any[] = [
    { id: 1, type: '📚 PRÉPARATION DES COURS', date: '08/06/2026', desc: 'Harmonisation du contenu pédagogique du Master' }
  ];

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {}

  // APPEL BACKEND INTACT : Enregistrement de la note
  sauvegarderNote(): void {
    this.formationService.attribuerNote(this.noteData).subscribe({
      next: () => {
        alert('Note académique enregistrée avec succès !');
        this.noteData = { valeurNote: 0, appreciation: '', etudiantId: null, codeMatiere: '' };
      },
      error: (err) => alert(err.error || 'Erreur lors de la sauvegarde de la note')
    });
  }

  // APPEL BACKEND INTACT : Lecture du bulletin
  consulterBulletin(): void {
    if (this.rechercheId) {
      this.formationService.getNotesEtudiant(this.rechercheId).subscribe({
        next: (data) => this.bulletin = data,
        error: (err) => console.error('Erreur de récupération du bulletin', err)
      });
    }
  }

  // Traitements Frontend isolés (Respect de l'architecture découplée)
  creerFicheFormation(): void {
    const formationCree = {
      id: this.catalogueFormations.length + 1,
      code: this.nouvelleFormation.code.toUpperCase(),
      intitule: this.nouvelleFormation.intitule,
      dateDebut: this.nouvelleFormation.dateDebut,
      dateFin: this.nouvelleFormation.dateFin,
      type: this.nouvelleFormation.typeFormation,
      niveau: this.nouvelleFormation.niveau,
      financement: this.nouvelleFormation.financement,
      montant: this.nouvelleFormation.montantFinancement,
      hommes: this.nouvelleFormation.nombreFormesHomme,
      femmes: this.nouvelleFormation.nombreFormesFemme
    };
    this.catalogueFormations.push(formationCree);
    alert(`Fiche de formation ${formationCree.code} initialisée dans le catalogue local !`);
    this.nouvelleFormation = { code: '', intitule: '', dateDebut: '', dateFin: '', typeFormation: 'INITIALE', niveau: 'MASTER', financement: 'PUBLIC', montantFinancement: 0, nombreFormesHomme: 0, nombreFormesFemme: 0 };
  }

  programmerSeance(): void {
    this.emploisDuTemps.push({
      id: this.emploisDuTemps.length + 1,
      jour: this.nouvelEmploi.jour,
      heure: this.nouvelEmploi.heure,
      ue: this.nouvelEmploi.ue,
      formateur: this.nouvelEmploi.formateur,
      type: this.nouvelEmploi.typeSeance === 'SYNCHRONE' ? 'SYNCHRONE (Visio)' : 'ASYNCHRONE'
    });
    alert('Séance de cours ajoutée à l\'emploi du temps !');
    this.nouvelEmploi = { jour: 'LUNDI', heure: '10:00 - 12:00', ue: '', formateur: '', typeSeance: 'SYNCHRONE' };
  }

  consignerReunionPedago(): void {
    const typesLabels: { [key: string]: string } = {
      'SUIVI_TUTORAT': '👥 SUIVI TUTORAT',
      'PREPA_COURS': '📚 PRÉPARATION DES COURS',
      'PREPA_EVAL': '📝 PRÉPARATION DES ÉVALUATIONS'
    };
    this.reunionsPedagogiques.unshift({
      id: this.reunionsPedagogiques.length + 1,
      type: typesLabels[this.nouvelleReunionPedago.typeObj],
      date: this.nouvelleReunionPedago.date,
      desc: this.nouvelleReunionPedago.description
    });
    alert('Réunion pédagogique enregistrée dans le registre de suivi !');
    this.nouvelleReunionPedago = { typeObj: 'SUIVI_TUTORAT', date: '', description: '' };
  }
}
