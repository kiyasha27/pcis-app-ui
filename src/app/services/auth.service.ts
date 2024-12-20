import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Fetch the current logged-in user's ID from sessionStorage.
   * @returns User ID as a number or null if not found.
   */
  getUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}
