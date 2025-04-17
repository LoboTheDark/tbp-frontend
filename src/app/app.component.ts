import { Component } from '@angular/core';
import { GameRegisterComponent } from './components/game-register/game-register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameRegisterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tbp-frontend';
}