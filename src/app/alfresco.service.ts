import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlfrescoService {
  private apiUrl = 'http://192.168.82.62:8080/alfresco/api/-default-/public/alfresco/versions/1';
  private username = 'kreethram';  // Use username from environment
  private password = 'KReethram@12'

  constructor(private http: HttpClient) {}

  // Fetch folders from Alfresco
  getFolders(nodeId: string): Observable<any> {
    const url = `${this.apiUrl}/nodes/c9581665-86f8-45d5-a65e-06d58b6c38da/children`;
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}` // Replace with your credentials
    });
    return this.http.get(url, { headers });
  }
}
