import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { GameDto } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  private allGamesUrl = `${environment.showAllGamesUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  getGames(steamId: string) {    
    return this.http.get<GameDto[]>(this.allGamesUrl + "/" + steamId);
  }
}
