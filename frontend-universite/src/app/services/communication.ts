import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  private url = 'http://localhost:8080/communication-service/api/communication';
  constructor(private http: HttpClient) { }

  getReunions(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/reunions`); }
  planifierReunion(reunion: any): Observable<any> { return this.http.post(`${this.url}/reunions`, reunion); }
  cloturerReunion(id: number, pv: any): Observable<any> { return this.http.put(`${this.url}/reunions/${id}/cloturer`, pv); }
}
