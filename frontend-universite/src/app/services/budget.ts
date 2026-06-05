import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetService {

  // 🌟 RECTIFICATION : Ajout du slash de fermeture réglementaire pour le routage Gateway
  private url = 'http://localhost:8080/budget-service/api/budget/';

  constructor(private http: HttpClient) { }

  allouer(budget: any): Observable<any> {
    return this.http.post(this.url, budget);
  }

  depenser(annee: number, montant: number): Observable<any> {
    // Correction de l'arborescence
    return this.http.put(`${this.url}${annee}/depenser?montant=${montant}`, {});
  }
}
