import { IDatabase, IGameData } from "./IDatabase";
import { Game } from "../Game";
import * as sqlite3 from "sqlite3";
import * as path from "path";
import * as fs from "fs";

const dbFolder = path.resolve(__dirname, "../../../db");
const dbPath = path.resolve(__dirname, "../../../db/game.db");

export class SQLite implements IDatabase {
  private db: sqlite3.Database;

  constructor() {
    // Create the table that will store every saves if not exists
    if (!fs.existsSync(dbFolder)) {
      fs.mkdirSync(dbFolder);
    }
    this.db = new sqlite3.Database(dbPath);
    this.db.run(
      "CREATE TABLE IF NOT EXISTS games(gameId varchar, players integer, saveId integer, game text, status text default 'running', created_time timestamp default (strftime('%s', 'now')), PRIMARY KEY (gameId, saveId))",
    );
  }

  getClonableGames(cb: (err: Error, allGames: Array<IGameData>) => void): void {
    const allGames: Array<IGameData> = [];
    const sql = "SELECT distinct gameId gameId, players players FROM games WHERE status = 'running' and saveId = 0 order by gameId asc";

    this.db.all(sql, [], (err: Error, rows) => {
      if (rows) {
        rows.forEach((row) => {
          const { gameId } = row;
          const playerCount: number = row.players;
          const gameData: IGameData = {
            gameId,
            playerCount,
          };
          allGames.push(gameData);
        });
        return cb(err, allGames);
      }
      return undefined;
    });
  }

  getGames(cb: (err: Error, allGames: Array<string>) => void): void {
    const allGames: Array<string> = [];
    const sql = "SELECT distinct gameId gameId FROM games WHERE status = 'running' and saveId > 0";
    this.db.all(sql, [], (err: Error, rows) => {
      if (rows) {
        rows.forEach((row) => {
          allGames.push(row.gameId);
        });
        return cb(err, allGames);
      }
      return undefined;
    });
  }

  restoreReferenceGame(gameId: string, game: Game, cb: (err: Error) => void): void {
    // Retrieve first save from database
    this.db.get(
      "SELECT gameId gameId, game game FROM games WHERE gameId = ? AND saveId = 0",
      [gameId],
      (err: Error, row: { gameId: string; game: string }) => {
        if (row.gameId === undefined) {
          return cb(new Error("Game not found"));
        }
        // Transform string to json
        const gameToRestore = JSON.parse(row.game);

        // Rebuild each objects
        game.loadFromJSON(gameToRestore);

        return cb(err);
      },
    );
  }

  restoreGameLastSave(gameId: string, game: Game, cb: (err: Error) => void): void {
    // Retrieve last save from database
    this.db.get(
      "SELECT game game FROM games WHERE gameId = ? ORDER BY saveId DESC LIMIT 1",
      [gameId],
      (err: Error, row: { game: string }) => {
        if (err) {
          return cb(err);
        }
        // Transform string to json
        const gameToRestore = JSON.parse(row.game);

        // Rebuild each objects
        try {
          game.loadFromJSON(gameToRestore);
        } catch (e) {
          console.log(gameToRestore);
          cb(e);
          return undefined;
        }

        return cb(err);
      },
    );
  }

  cleanSaves(gameId: string, saveId: number): void {
    // DELETE all saves except initial and last one
    this.db.run(
      "DELETE FROM games WHERE gameId = ? AND saveId < ? AND saveId > 0",
      [gameId, saveId],
      (err: Error) => {
        if (err) {
          return console.warn(err.message);
        }
        return undefined;
      },
    );
    // Flag game as finished
    this.db.run(
      "UPDATE games SET status = 'finished' WHERE gameId = ?",
      [gameId],
      (err: Error) => {
        if (err) {
          return console.warn(err.message);
        }
        return undefined;
      },
    );
  }

  restoreGame(gameId: string, saveId: number, game: Game): void {
    // Retrieve last save from database
    this.db.get(
      "SELECT game game FROM games WHERE gameId = ? AND saveId = ? ORDER BY saveId DESC LIMIT 1",
      [gameId, saveId],
      (err: { message: Error }, row: { game: string }) => {
        if (err) {
          return console.error(err.message);
        }
        // Transform string to json
        const gameToRestore = JSON.parse(row.game);

        // Rebuild each objects
        game.loadFromJSON(gameToRestore);

        return true;
      },
    );
  }

  saveGameState(
    gameId: string,
    saveId: number,
    game: string,
    players: number,
  ): void {
    // Insert
    this.db.run(
      "INSERT INTO games(gameId, saveId, game, players) VALUES(?, ?, ?, ?)",
      [gameId, saveId, game, players],
      (err: Error) => {
        if (err) {
          // Should be a duplicate, does not matter

        }
      },
    );
  }
}
