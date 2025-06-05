import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { GameListService } from '../../services/game-list.service';
import { ActivatedRoute, Router } from '@angular/router'; // Ensure Router is imported
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameDto } from '../../models/game.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'; // Import MatPaginatorModule and PageEvent
import { PaginatedGamesResponse } from '../../models/paginated-response.model'; // Import the new interface

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
    MatToolbarModule,
    MatPaginatorModule // Add MatPaginatorModule here
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent implements OnInit { // Implement OnInit
  isLoading: boolean = false;
  steamId: string | null = null;
  games: GameDto[] = []; // This will now directly hold the games for the current page
  error: string | null = null;

  // Pagination properties
  pageSize: number = 20; // Number of items per page (default)
  currentPage: number = 0; // Current page index (0-based, default)
  totalGames: number = 0; // Total number of games, obtained from backend

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router for URL updates
    private authService: AuthService,
    private gameListService: GameListService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit triggered!');

    // First, get the steamId from route parameters or auth service
    this.route.paramMap.subscribe(params => {
      this.steamId = params.get('steamId') || this.authService.getSteamId();
    });

    // Then, subscribe to query parameters to set initial pagination state
    this.route.queryParamMap.subscribe(params => {
      // Parse page and size from URL, default to 0 and 8 if not present
      this.currentPage = parseInt(params.get('page') || '0', 10);
      this.pageSize = parseInt(params.get('size') || '20', 10);

      // Ensure that current Steam ID is available before loading games
      if (this.steamId) {
        this.loadGames(); // Load games based on initial/updated route parameters
      }
    });
  }

  loadGames(): void {
    this.isLoading = true;
    this.error = null;
    if (!this.steamId) {
      this.error = `Steam id is null`;
      this.isLoading = false;
      console.error(this.error);
      return;
    }

    // Call the service with pagination parameters
    this.gameListService.getGames(this.currentPage, this.pageSize).subscribe({
      next: (response: PaginatedGamesResponse) => { // Expect PaginatedGamesResponse
        this.games = response.games; // Assign games for the current page
        this.totalGames = response.totalCount; // Update total count from backend
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

  // Handler for page change event from Mat Paginator
  onPageChange(event: PageEvent): void {
    // Update the URL with new page and size query parameters
    // This will trigger the queryParamMap subscription in ngOnInit, which then calls loadGames()
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: event.pageIndex,
        size: event.pageSize
      },
      queryParamsHandling: 'merge' // Merge with any existing query parameters
    });
    // We don't call loadGames() directly here because the URL change will trigger it.
  }

  getImageUrl(imageBase64: string): string {
    if (!imageBase64) {
      return 'assets/placeholder.png'; // Or a default image
    }
    return `data:image/png;base64,${imageBase64}`;
  }
}