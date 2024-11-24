import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
   // Object to track visibility of details for each sub-card
   detailsVisibility: { [key: string]: boolean } = {
    'Hospital Bills': false,
    'Medical Review': false,
    'Indexing Task': false
  };

  // Toggle the visibility of the details card for a specific task
  viewDetails(taskName: string): void {
    this.detailsVisibility[taskName] = !this.detailsVisibility[taskName];
  }

  // Method to open the task
  openTask(taskName: string) {
    console.log(`Opening task: ${taskName}`);
    // Implement logic to open the task or navigate to the task page
  }

  
}
