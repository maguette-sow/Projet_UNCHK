import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  // 🛑 ATTENTION : On attaque UNIQUEMENT le port 8080 de la Gateway
  // La gateway se charge de rediriger vers le microservice utilisateur (port 8081)
  private gatewayUrl = 'http://localhost:8080/utilisateur-service/api/utilisateurs';

  // DIP : Injection du HttpClient standard par le constructeur
  constructor(private http: HttpClient) { }

  /**
   * Appeler la Gateway pour lister tous les comptes
   */
  getUtilisateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.gatewayUrl);
  }

  /**
   * Appeler la Gateway pour enregistrer un nouvel utilisateur (ADMIN, ETUDIANT, etc.)
   */
  creerUtilisateur(utilisateur: any): Observable<any> {
    return this.http.post<any>(this.gatewayUrl, utilisateur);
  }
}

export class Utilisateur {
}
