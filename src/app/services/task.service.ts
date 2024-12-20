import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl = '/activiti-app/api/enterprise/historic-tasks/query';
  private readonly filterUrl = '/activiti-app/api/enterprise/tasks/filter';
  private readonly claimUrl = '/activiti-app/api/enterprise/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  
  /**
   * Fetch tasks based on assignment and completion status.
   * @param finished - Task completion status (true for completed tasks).
   * @returns Observable of tasks.
   */
  getTasks(finished: boolean): Observable<any> {
    const headers = this.createHeaders();
    const userId = this.authService.getUserId(); // Fetch the current user's ID

    if (!userId) {
      throw new Error('User ID is not available. Ensure the user is logged in.');
    }

    const payload = {
      finished,
      taskAssignee: userId,
    };

    return this.http.post(this.baseUrl, payload, { headers });
  }

  /**
   * Fetch filtered tasks based on specific criteria.
   * @param sort - Sorting field.
   * @param name - Name filter.
   * @param assignment - Assignment filter.
   * @returns Observable of filtered tasks.
   */
  getFilteredTasks(
    sort: string,
    name: string,
    assignment: string
  ): Observable<any> {
    const headers = this.createHeaders();

    const payload = {
      filter: {
        sort,
        name,
        assignment,
      },
    };

    return this.http.post(this.filterUrl, payload, { headers });
  }

  /**
   * Claim a task using its ID.
   * @param taskId - ID of the task to be claimed.
   * @returns Observable of the claim response.
   */
  claimTask(taskId: string): Observable<any> {
    const headers = this.createHeaders();
    const url = `${this.claimUrl}/${taskId}/action/claim`;

    return this.http.put(url, {}, { headers });
  }

  /**
   * Helper method to create HTTP headers for API requests.
   * Uses `admin@app.activiti.com` credentials.
   */
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('admin@app.activiti.com:^dTg3mqQxVJ%XT9t66kA+@k4g'),
    });
  }
//old
  
}
