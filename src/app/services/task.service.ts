import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = '/activiti-app/api/enterprise/historic-tasks/query';

  constructor(private http: HttpClient) {}

  /**
   * Fetch tasks based on their completion status and assignee.
   * 
   * @param taskAssignee - ID of the task assignee
   * @param finished - Completion status of the tasks (true for completed, false for incomplete)
   */
  getTasks(taskAssignee: number, finished: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('admin@app.activiti.com:^dTg3mqQxVJ%XT9t66kA+@k4g'),
    });

    const payload = {
      finished: finished, // Dynamically set the task status
      taskAssignee: taskAssignee,
    };

    return this.http.post(this.baseUrl, payload, { headers });
  }
}
