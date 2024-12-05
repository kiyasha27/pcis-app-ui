import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TaskService } from '../services/task.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent {
  /*completedTasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
   
    this.loadCompletedTasks();
  }

  loadCompletedTasks(): void {
    this.taskService.getTasks(1, true).subscribe(
      (data) => {
        this.completedTasks = data.data; // Adjust if necessary
      },
      (error) => {
        console.error('Error fetching completed tasks:', error);
      }
    );
  }*/
}


