import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QueuedTasksServiceService {

  private filterUrl = '/activiti-app/api/enterprise/tasks/filter';

  constructor(private http: HttpClient) {}

  /**
   * Fetch tasks based on filter criteria.
   * 
   * @param sort - Sorting order (e.g., 'created-desc')
   * @param name - Filter by task name (empty string for no filtering)
   * @param assignment - Assignment filter (e.g., 'candidate')
   */
  getFilteredTasks(sort: string, name: string, assignment: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('admin@app.activiti.com:^dTg3mqQxVJ%XT9t66kA+@k4g'),
    });

    const payload = {
      filter: {
        sort: sort,
        name: name,
        assignment: assignment,
      }
    };

    return this.http.post(this.filterUrl, payload, { headers });
  }
}