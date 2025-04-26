// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' // This makes the service a singleton provided at the root level
})
export class AuthService {

  // Replace with your actual backend API URL for registration
  private registrationUrl = `${environment.registerUserUrl}`;

  constructor(private http: HttpClient) { } // Inject HttpClient

  /**
   * Sends registration data to the backend.
   * @param registrationData - An object containing username, email, and password.
   * @returns An Observable with the backend response.
   */
  register(registrationData: any): Observable<any> {
    // Make an HTTP POST request to the backend registration endpoint
    return this.http.post<any>(this.registrationUrl, registrationData);
  }

  // You will add other methods here later, like login, logout, etc.
  // login(credentials: any): Observable<any> { ... }
  // logout(): void { ... }
  // getToken(): string | null { ... }
}