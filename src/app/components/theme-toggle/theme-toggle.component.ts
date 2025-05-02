import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule, 
    MatSlideToggleModule, 
    MatIconModule, 
    MatButtonModule,
    MatTooltipModule
  ],
  template: `
    <button mat-icon-button 
            (click)="toggleTheme()" 
            [matTooltip]="(themeService.activeTheme$ | async) === 'dark-theme' ? 'Switch to light mode' : 'Switch to dark mode'">
      <mat-icon>{{ (themeService.activeTheme$ | async) === 'dark-theme' ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `,
  styles: [`
    button {
      margin: 0 8px;
    }
  `]
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}