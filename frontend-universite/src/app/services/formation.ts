import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormationService {
  private url = 'http://localhost:8080/formation-service/api/notes';
  constructor(private http: HttpClient) { }

  attribuerNote(note: any): Observable<any> { return this.http.post(this.url, note); }
  getNotesEtudiant(id: number): Observable<any[]> { return this.http.get<any[]>(`${this.url}/etudiant/${id}`); }
}

