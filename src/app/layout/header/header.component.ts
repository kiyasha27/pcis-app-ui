import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { SidebarComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
  // Check if the button click event is registered
    this.sidebarService.toggleSidebar();
    // Check if the visibility state is changing
  }
  searchQuery: string = '';

  onSearch(): void {
    console.log('Search Query:', this.searchQuery);
    // Add logic here to handle the search, e.g., filtering a list or triggering an API call
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }
}
