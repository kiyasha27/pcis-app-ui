import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = '/activiti-app/api/enterprise/historic-tasks/query';
  private filterUrl = '/activiti-app/api/enterprise/tasks/filter';

  constructor(private http: HttpClient) {}

  /**
   * Fetch tasks based on their completion status and assignee.
   * 
   * @param taskAssignee - ID of the task assignee
   * @param finished - Completion status of the tasks (true for completed, false for incomplete)
   */
  getTasks(taskAssignee: number, finished: boolean): Observable<any> {
    const headers = this.createHeaders();

    const payload = {
      finished: finished,
      taskAssignee: taskAssignee,
    };

    return this.http.post(this.baseUrl, payload, { headers });
  }

  /**
   * Fetch tasks based on filter criteria.
   * 
   * @param sort - Sorting order (e.g., 'created-desc')
   * @param name - Filter by task name (empty string for no filtering)
   * @param assignment - Assignment filter (e.g., 'candidate')
   */
  getFilteredTasks(sort: string, name: string, assignment: string): Observable<any> {
    const headers = this.createHeaders();

    const payload = {
      filter: {
        sort: sort,
        name: name,
        assignment: assignment,
      }
    };

    return this.http.post(this.filterUrl, payload, { headers });
  }

  /**
   * Helper method to create HTTP headers for API requests.
   */
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('admin@app.activiti.com:^dTg3mqQxVJ%XT9t66kA+@k4g'),
    });
  }
}
