import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InsertionService {
  private url = 'http://localhost:8080/insertion-service/api/insertion';
  constructor(private http: HttpClient) { }

  enregistrer(data: any): Observable<any> { return this.http.post(this.url, data); }
  getStatistiques(statut: string): Observable<any[]> { return this.http.get<any[]>(`${this.url}/statistiques?statut=${statut}`); }
}

