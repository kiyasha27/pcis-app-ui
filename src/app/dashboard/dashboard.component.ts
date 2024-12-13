import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskService } from '../services/task.service';
import { interval } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadAssignedTasks();
    this.loadCompletedTasks();
  }

  loadAssignedTasks(): void {
    this.taskService.getTasks(203, false).subscribe(
      (data) => {
        this.assignedTasks = data.data; // Adjust according to your data structure
        this.updatePagedAssignedTasks();
      },
      (error) => {
        console.error('Error fetching assigned tasks:', error);
      }
    );
  }

  loadCompletedTasks(): void {
    this.taskService.getTasks(203, true).subscribe(
      (data) => {
        this.completedTasks = data.data; // Adjust according to your data structure
        this.updatePagedCompletedTasks();
      },
      (error) => {
        console.error('Error fetching completed tasks:', error);
      }
    );
  }

  openTask(taskId: string): void {
    const taskUrl = `http://192.168.82.62:8081/activiti-app/workflow/#/task/${taskId}`;
    window.open(taskUrl, '_blank'); // Opens the task in a new tab
  }

  // Update paged assigned tasks
  updatePagedAssignedTasks(): void {
    const startIndex = this.assignedTasksPageIndex * this.assignedTasksPageSize;
    const endIndex = startIndex + this.assignedTasksPageSize;
    this.pagedAssignedTasks = this.assignedTasks.slice(startIndex, endIndex);
  }

  // Update paged completed tasks
  updatePagedCompletedTasks(): void {
    const startIndex = this.completedTasksPageIndex * this.completedTasksPageSize;
    const endIndex = startIndex + this.completedTasksPageSize;
    this.pagedCompletedTasks = this.completedTasks.slice(startIndex, endIndex);
  }

  // Handle page change for assigned tasks
  paginateAssignedTasks(event: PageEvent): void {
    this.assignedTasksPageIndex = event.pageIndex;
    this.assignedTasksPageSize = event.pageSize;
    this.updatePagedAssignedTasks();
  }

  // Handle page change for completed tasks
  paginateCompletedTasks(event: PageEvent): void {
    this.completedTasksPageIndex = event.pageIndex;
    this.completedTasksPageSize = event.pageSize;
    this.updatePagedCompletedTasks();
  }
}