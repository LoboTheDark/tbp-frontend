import { GameDto } from './game.model';

export interface PaginatedGamesResponse {
  games: GameDto[];
  totalCount: number;
}