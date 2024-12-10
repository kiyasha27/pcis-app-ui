import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskService } from '../services/task.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  assignedTasks: any[] = [];
  completedTasks: any[] = [];


  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadAssignedTasks();
    this.loadCompletedTasks();
  }



  loadAssignedTasks(): void {
    this.taskService.getTasks(203, false).subscribe(
      (data) => {
        this.assignedTasks = data.data; // Adjust if necessary
      },
      (error) => {
        console.error('Error fetching assigned tasks:', error);
      }
    );
  }

  loadCompletedTasks(): void {
    this.taskService.getTasks(203, true).subscribe(
      (data) => {
        this.completedTasks = data.data; // Adjust if necessary
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
}
