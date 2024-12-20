import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],

})
export class SidebarComponent implements OnInit {


  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;
  isLoggedIn = false;
  username: string | null = null;


  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisibility$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    });

    this.sidebarService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.sidebarService.username$.subscribe((username) => {
      this.username = username; // Update the local username state
    });
  }

    

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarService.toggleSidebar(); // Toggle sidebar state
  }


  selectDashboard() {
    this.isDashboardSelected = true;
  }

  // Call this method when login is successful
  login() {
    this.isLoggedIn = true; // Set login status to true
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen; // Toggle the tasks submenu
  }

}
