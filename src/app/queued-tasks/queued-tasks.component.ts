import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './queued-tasks.component.html',
  styleUrls: ['./queued-tasks.component.scss']
})
export class QueuedTasksComponent {
  // Define detailsVisibility with index signature for dynamic task names
  detailsVisibility: Record<string, boolean> = { 'Queued Task': false };
  
  // Define columns for the table
  displayedColumns: string[] = ['status', 'date', 'created', 'completed', 'assignee'];
  
  // Define default task data
  taskData = [
    { 
      status: 'In Progress', 
      date: '2024-11-24', 
      created: '2024-11-23', 
      completed: 'Not Yet', 
      assignee: 'John Doe' 
    }
  ];
  viewDetails(taskName: string): void {
    this.detailsVisibility[taskName] = !this.detailsVisibility[taskName];
  }

  openTask(taskName: string): void {
    console.log('Claimed task:', taskName);
    // Add logic for claiming the task
  }
}
