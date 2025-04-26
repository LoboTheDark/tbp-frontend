import { Component } from '@angular/core';
import { GameRegisterComponent } from './components/game-register/game-register.component';
import { AuthComponent } from './components/auth/auth.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tbp-frontend';
}