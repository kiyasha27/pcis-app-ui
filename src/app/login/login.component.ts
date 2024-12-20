import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  users = {
    kreethram: 203, // this userId associated to the username determines if the tasks are displayed not 
    admin: 1, //this userId associated to the username determines if the tasks are displayed not 
    mohammad: 202,
    kgothatso: 101
  };

  constructor(private sidebarService: SidebarService) {}

  login(): void {
    const userId = this.users[this.username as keyof typeof this.users];
    if (userId) {
      this.sidebarService.login(this.username); // Pass the username to SidebarService
      sessionStorage.setItem('userId', userId.toString()); // Save the user ID in sessionStorage
      alert(`Welcome, ${this.username}!`);
    } else {
      alert('Invalid username. Please try again.');
    }
  }

}

