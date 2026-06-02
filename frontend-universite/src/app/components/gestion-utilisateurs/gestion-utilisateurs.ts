import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../services/utilisateur';

@Component({
  selector: 'app-gestion-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-utilisateurs.html', // 💡 Corrigé (un seul point)
  styleUrl: './gestion-utilisateurs.css'       // 💡 Corrigé (un seul point)
})
export class GestionUtilisateursComponent implements OnInit {

  // Données de l'interface
  utilisateurs: any[] = [];

  // Modèle pour le formulaire d'ajout
  nouvelUtilisateur = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    role: 'ETUDIANT' // Rôle par défaut
  };

  // DIP : Injection du service métier
  constructor(private utilisateurService: UtilisateurService) {}

  // 💡 CORRECTION ICI : Le type de retour doit être void
  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }

  ajouterUtilisateur() {
    this.utilisateurService.creerUtilisateur(this.nouvelUtilisateur).subscribe({
      next: () => {
        alert('Utilisateur créé avec succès !');
        this.chargerUtilisateurs(); // Rafraîchit le tableau automatiquement
        this.nouvelUtilisateur = { nom: '', prenom: '', email: '', motDePasse: '', role: 'ETUDIANT' }; // Reset
      },
      error: (err) => alert('Erreur : ' + err.error)
    });
  }
}
