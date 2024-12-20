import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  username = '';
  users = {
    kreethram: 2030,
    adminn: 1012,
  };
  isLoggedIn = false; // Track login status

  

  constructor(private sidebarService: SidebarService, private router: Router) {}

logout(): void {
  this.sidebarService.logout();
  this.router.navigate(['/login']); // Redirect to login page
}
  ngOnInit(): void {
    // Subscribe to login state
    this.sidebarService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        const storedUsername = sessionStorage.getItem('username');
        this.username = storedUsername || '';
      }
    });

    // Subscribe to username changes (optional, for real-time updates)
    this.sidebarService.username$.subscribe((name) => {
      this.username = name;
    });
  }


  login(): void {
    const userId = this.users[this.username as keyof typeof this.users];
    if (userId) {
     
      this.sidebarService.login(this.username); // Pass the username to SidebarService
      this.isLoggedIn = true; // Update the login status
    } else {
      alert('Invalid username. Please try again.');
    }
  }
  

  toggleSidebar() {
    // Check if the button click event is registered
      this.sidebarService.toggleSidebar();
      // Check if the visibility state is changing
    }
}