import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

  export class SidebarService {
    private sidebarVisibility = new BehaviorSubject<boolean>(true);
    sidebarVisibility$ = this.sidebarVisibility.asObservable();
    
  
    toggleSidebar() {
      const currentState = this.sidebarVisibility.value;
      this.sidebarVisibility.next(!currentState);
    }
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);  // Default is not logged in
    isLoggedIn$ = this.isLoggedInSubject.asObservable();  // Expose as observable to listen for changes
  
    constructor() {}
  
// Method to set login status
login() {
  this.isLoggedInSubject.next(true); // Set to true when user logs in
}

// Method to log out
logout() {
  this.isLoggedInSubject.next(false); // Set to false when user logs out
}
    
}
