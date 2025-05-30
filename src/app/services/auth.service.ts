// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // This makes the service a singleton provided at the root level
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private readonly STEAM_ID_KEY = 'steamId';


  // Replace with your actual backend API URL for registration
  private registrationUrl = `${environment.registerUserUrl}`;
  private loginUrl = `${environment.loginUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Sends registration data to the backend.
   * @param registrationData - An object containing username, email, and password.
   * @returns An Observable with the backend response.
   */
  register(registrationData: any): Observable<any> {
    // Make an HTTP POST request to the backend registration endpoint
    return this.http.post<any>(this.registrationUrl, registrationData);
  }

  login(credentials: { username: string; password: string}) {
    return this.http.post<{ token: string, steamId: string }>(this.loginUrl, credentials);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
    this.clearToken();
    this.clearSteamId();
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    // Optional: Ablaufdatum prüfen, z. B. via jwt-decode
    return !!token;
  }

  saveSteamId(steamId: string): void {
    localStorage.setItem(this.STEAM_ID_KEY, steamId);
  }

  getSteamId(): string | null {
    return localStorage.getItem(this.STEAM_ID_KEY);
  }

  clearSteamId(): void {
    localStorage.removeItem(this.STEAM_ID_KEY);
  }
}