import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDto } from '../models/game.model';
import { environment } from '../../environments/environment';
import { PaginatedGamesResponse } from '../models/paginated-response.model'; // Import the new interface

@Injectable({
  providedIn: 'root'
})
export class GameListService {
  // IMPORTANT: Replace with your actual backend API URL
  private apiUrl = `${environment.showAllGamesUrl}`;

  constructor(private http: HttpClient) { }

  /**
   * Fetches games from the backend with pagination.
   * @param pageIndex The 0-based index of the page to retrieve.
   * @param pageSize The number of items per page.
   * @returns An Observable of PaginatedGamesResponse containing the games and total count.
   */
  getGames(pageIndex: number, pageSize: number): Observable<PaginatedGamesResponse> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    // Make the HTTP GET request with the pagination parameters
    return this.http.get<PaginatedGamesResponse>(this.apiUrl, { params });
  }
}