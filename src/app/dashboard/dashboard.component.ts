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

  openTask(taskName: string): void {
    console.log(`Opening task: ${taskName}`);
    window.location.href = 'http://192.168.82.62:8081/activiti-app/#/';
  }
  
  
}
