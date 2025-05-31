import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für *ngIf etc.
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { GameListService } from '../../services/game-list.service';
import { ActivatedRoute, Router } from '@angular/router'; // <-- Import Router (For navigation after success)
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameDto } from '../../models/game.model';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule, 
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatToolbarModule
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})


export class HomeScreenComponent {
  isLoading: boolean = false;
  steamId: string | null = null;
  games: GameDto[] = [];
  error: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService, private gameListService: GameListService ){}

 ngOnInit(): void {
    console.log('ngOnInit triggered!');
    this.route.paramMap.subscribe(params => {
      this.steamId = params.get('steamId') || this.authService.getSteamId();      
      if (this.steamId) {         
        this.loadGames();
        }
      });
    }
  
 

  loadGames(): void {
    this.isLoading = true;
    this.error = null;
    if(!this.steamId)
    {
       this.error = `Steam id is null`;
        this.isLoading = false;
        console.error(this.error);
       return;
    }

    this.gameListService.getGames().subscribe({
      next: (data: GameDto[]) => { // Typisierung beachten!
        this.games = data;
        this.isLoading = false;
        console.log('Spiele geladen:', this.games);
      },
      error: (err) => {
        this.error = `Fehler beim Laden der Spiele: ${err.message || err.statusText || 'Unbekannter Fehler'}`;
        this.isLoading = false;
        console.error('Fehler beim Abrufen der Spiele:', err);
      }
    });
  }

  getImageUrl(imageBase64: string): string {
    if (!imageBase64) {
      return 'assets/placeholder.png'; // Oder ein Standardbild
    }
    return `data:image/png;base64,${imageBase64}`;
  }
  
}
