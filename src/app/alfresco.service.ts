import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlfrescoService {
  private apiUrl = 'http://192.168.82.62:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/c9581665-86f8-45d5-a65e-06d58b6c38da/children';

  private username = 'kreethram'; // Replace with your Alfresco username
  private password = 'KReethram@12'; // Replace with your Alfresco password

  constructor(private http: HttpClient) {}

  getFolders(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
