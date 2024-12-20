import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

  export class SidebarService {
    private sidebarVisibility = new BehaviorSubject<boolean>(true);
    sidebarVisibility$ = this.sidebarVisibility.asObservable();

  
    constructor() {}
    
    private isLoggedInSource = new BehaviorSubject<boolean>(false);
    private usernameSource = new BehaviorSubject<string>('');
  
    isLoggedIn$ = this.isLoggedInSource.asObservable();
    username$ = this.usernameSource.asObservable();
  
    login(username: string): void {
      this.isLoggedInSource.next(true);
      this.usernameSource.next(username);
      sessionStorage.setItem('username', username); // Save the username
    }
  
    logout(): void {
      this.isLoggedInSource.next(false);
      this.usernameSource.next('');
      sessionStorage.clear(); // Clear all session storage data
    }
    
  
    toggleSidebar() {
      const currentState = this.sidebarVisibility.value;
      this.sidebarVisibility.next(!currentState);
    }

  }