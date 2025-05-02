import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThemeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  activeTheme$ = this.activeThemeSubject.asObservable();

  constructor() {
    // Apply the initial theme
    this.applyTheme(this.activeThemeSubject.value);
  }

  toggleTheme(): void {
    const newTheme = this.activeThemeSubject.value === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.activeThemeSubject.next(theme);
    this.applyTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: Theme): void {
    // Remove the previous theme class
    document.body.classList.remove('light-theme', 'dark-theme');
    // Add the new theme class
    document.body.classList.add(theme);
  }

  private getInitialTheme(): Theme {
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'light-theme' || savedTheme === 'dark-theme')) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark-theme';
    }
    
    // Default to light theme
    return 'light-theme';
  }
}