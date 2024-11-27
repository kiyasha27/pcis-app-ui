import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadUrl = 'https://documentsqa.pcisvision.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/ef1ed811-edaa-4364-972d-6f1b95a9216a/children'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post(this.uploadUrl, formData); // No authorization headers are added
  }
}
