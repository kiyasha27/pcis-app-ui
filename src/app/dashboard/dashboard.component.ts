import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  // Method to view task details
  viewDetails(taskName: string) {
    console.log(`Viewing details for: ${taskName}`);
    // Implement logic to show task details or navigate to a details page
  }

  // Method to open the task
  openTask(taskName: string) {
    console.log(`Opening task: ${taskName}`);
    // Implement logic to open the task or navigate to the task page
  }

  
}
