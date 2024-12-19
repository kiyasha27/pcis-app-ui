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

  
  getTasks(taskAssignee: number, finished: boolean): Observable<any> {
    const headers = this.createHeaders();

    const payload = {
      finished: finished,
      taskAssignee: taskAssignee,
    };

    return this.http.post(this.baseUrl, payload, { headers });
  }

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

   
 claimTask(taskId: string): Observable<any> {
  const headers = this.createHeadersClaim();
  const url = `/activiti-app/api/enterprise/tasks/${taskId}/action/claim`;
  

  return this.http.put(url, { headers });
}

  /**
   * Helper method to create HTTP headers for API requests.
   */
    private createHeadersClaim(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa ('kreethram:KReethram@12'),
        
        
      });
    }
    private createHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa ('admin@app.activiti.com:^dTg3mqQxVJ%XT9t66kA+@k4g'),
        
        
      });
    }


//old
  
}
