import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = '/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children'; // Use relative path for proxy

  constructor(private http: HttpClient) {}

  uploadFile(file: File, nodeType: string, relativePath: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa('kreethram:KReethram@12'), // Ensure credentials are correct
    });

    const formData = new FormData();
    formData.append('filedata', file);
    formData.append('nodeType', nodeType);
    formData.append('relativePath', relativePath);

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
