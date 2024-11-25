import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  hospitalBillsData = [
    { 
      status: 'In Progress', 
      date: '2024-11-24', 
      created: '2024-11-23', 
      completed: 'Not Yet', 
      assignee: 'John Doe' 
    }
  ];
  
  medicalReviewData = [
    { 
      status: 'In Progress', 
      date: '2024-11-24', 
      created: '2024-11-23', 
      completed: 'Not Yet', 
      assignee: 'John Doe' 
    }
  ];
  
  indexingTaskData = [
    { 
      status: 'In Progress', 
      date: '2024-11-24', 
      created: '2024-11-23', 
      completed: 'Not Yet', 
      assignee: 'John Doe' 
    }
  ];
  
  displayedColumns: string[] = ['status', 'date', 'created', 'completed', 'assignee'];
  
  detailsVisibility: { [key: string]: boolean } = {};
  
  // Toggle the visibility of the details card for a specific task
  viewDetails(taskName: string): void {
    this.detailsVisibility[taskName] = !this.detailsVisibility[taskName];
  }

  openTask(taskName: string): void {
    console.log(`Opening task: ${taskName}`);
    window.location.href = 'http://192.168.82.62:8081/activiti-app/#/';
  }
  
  
}
