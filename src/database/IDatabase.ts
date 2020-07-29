import { Game } from "../Game";

export interface IGameData {
  gameId: string;
  playerCount: number;
}

export interface IDatabase {
  cleanSaves(gameId: string, saveId: number): void;
  restoreGame(gameId: string, saveId: number, game: Game): void;
  restoreGameLastSave(
    gameId: string,
    game: Game,
    cb: (err: Error) => void
  ): void;
  saveGameState(
    gameId: string,
    saveId: number,
    game: string,
    players: number
  ): void;
  getGames(cb: (err: Error, allGames: Array<string>) => void): void;
  restoreReferenceGame(
    gameId: string,
    game: Game,
    cb: (err: Error) => void
  ): void;
  getClonableGames(cb: (err: Error, allGames: Array<IGameData>) => void): void;
}
