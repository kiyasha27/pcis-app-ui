import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { TaskService } from '../services/task.service';
import { interval } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  assignedTasks: any[] = [];
  completedTasks: any[] = [];
  pagedAssignedTasks: any[] = []; // Paginated assigned tasks
  pagedCompletedTasks: any[] = []; // Paginated completed tasks

  // Pagination variables
  assignedTasksPageSize = 5;
  assignedTasksPageIndex = 0;

  completedTasksPageSize = 5;
  completedTasksPageIndex = 0;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      const numericUserId = parseInt(userId, 10);
      this.loadAssignedTasks();
      this.loadCompletedTasks();
    } else {
      console.error('User ID not found. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  loadAssignedTasks(): void {
    this.taskService.getTasks(false).subscribe(
      (data) => {
        console.log('Assigned Tasks:', data);
        this.assignedTasks = data.data || []; // Safely assign tasks
        this.updatePagedAssignedTasks();
      },
      (error) => {
        console.error('Error fetching assigned tasks:', error);
      }
    );
  }

  loadCompletedTasks(): void {
    this.taskService.getTasks(true).subscribe(
      (data) => {
        console.log('Completed Tasks:', data);
        this.completedTasks = data.data || []; // Safely assign tasks
        this.updatePagedCompletedTasks();
      },
      (error) => {
        console.error('Error fetching completed tasks:', error);
      }
    );
  }

  updatePagedAssignedTasks(): void {
    const startIndex = this.assignedTasksPageIndex * this.assignedTasksPageSize;
    const endIndex = startIndex + this.assignedTasksPageSize;
    this.pagedAssignedTasks = this.assignedTasks.slice(startIndex, endIndex);
  }

  updatePagedCompletedTasks(): void {
    const startIndex = this.completedTasksPageIndex * this.completedTasksPageSize;
    const endIndex = startIndex + this.completedTasksPageSize;
    this.pagedCompletedTasks = this.completedTasks.slice(startIndex, endIndex);
  }

  paginateAssignedTasks(event: PageEvent): void {
    this.assignedTasksPageIndex = event.pageIndex;
    this.assignedTasksPageSize = event.pageSize;
    this.updatePagedAssignedTasks();
  }

  paginateCompletedTasks(event: PageEvent): void {
    this.completedTasksPageIndex = event.pageIndex;
    this.completedTasksPageSize = event.pageSize;
    this.updatePagedCompletedTasks();
  }

  openTask(taskId: string): void {
    const taskUrl = `http://192.168.82.62:8081/activiti-app/workflow/#/task/${taskId}`;
    window.open(taskUrl, '_blank');
  }
}
