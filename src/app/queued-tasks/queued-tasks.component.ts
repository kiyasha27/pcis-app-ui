import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './queued-tasks.component.html',
  styleUrls: ['./queued-tasks.component.scss']
})
export class QueuedTasksComponent {
  queuedTasks: any[] = [];
  pagedQueuedTasks: any[] = []; // Paginated array for queued tasks
  pageSize = 7;
  pageIndex = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.queuedTask();
  }

  queuedTask(): void {
    this.taskService.getFilteredTasks('created-desc', '', 'candidate').subscribe(
      (data) => {
        this.queuedTasks = data.data; // Store all tasks
        this.paginateQueuedTasks({
          pageIndex: this.pageIndex, pageSize: this.pageSize,
          length: 0
        }); // Set the initial page
        console.log('Filtered tasks:', data);
      },
      (error) => {
        console.error('Error fetching filtered tasks:', error);
      }
    );
  }

  paginateQueuedTasks(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedQueuedTasks = this.queuedTasks.slice(startIndex, endIndex);
  }

  retrieveTask(taskId: string): void {
    this.taskService.claimTask(taskId).subscribe(
      (response) => {
        console.log('Task claimed successfully!', response);
        alert('The task has been claimed successfully!');
        this.queuedTask(); // Re-fetch the tasks after the task is claimed
      },
      (claimTaskError) => {
        console.error('Error claiming task:', claimTaskError);
        alert('There was an issue claiming the task.\nYou will be redirected to another page to claim your task.\n\nThank you.');
        this.openTask(taskId); // Redirect user to claim the task manually
      }
    );
  }

  openTask(taskId: string): void {
    const taskUrl = `http://192.168.82.62:8081/activiti-app/workflow/#/task/${taskId}`;
    window.open(taskUrl, '_blank'); // Opens the task in a new tab
  }
}
