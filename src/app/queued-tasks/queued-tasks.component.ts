import { Component } from '@angular/core';
import { QueuedTasksServiceService } from '../services/queued-tasks-service.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './queued-tasks.component.html',
  styleUrls: ['./queued-tasks.component.scss']
})
export class QueuedTasksComponent {
  queuedTasks: any[] = [];


  constructor(private taskService: TaskService) {}
  ngOnInit(): void {

    this.queuedTask();
  }

  queuedTask(): void{
    // Example usage of getFilteredTasks
    this.taskService.getFilteredTasks('created-desc', '', 'candidate').subscribe(
      (data) => {
        this.queuedTasks = data.data; // Adjust if necessary
        console.log('Filtered tasks:', data);
      },
      (error) => {
        console.error('Error fetching filtered tasks:', error);
      }
    );
  }
}
