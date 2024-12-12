import { Component } from '@angular/core';
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
  
        // Call openTask with the taskId
        this.openTask(taskId);
      }
    );
  }
  
  openTask(taskId: string): void {
    const taskUrl = `http://192.168.82.62:8081/activiti-app/workflow/#/task/${taskId}`;
    window.open(taskUrl, '_blank'); // Opens the task in a new tab
  }

}
