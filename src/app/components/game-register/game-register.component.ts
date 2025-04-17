import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-register.component.html',
  styleUrls: ['./game-register.component.css']
})
export class GameRegisterComponent {
  name: string = '';
}