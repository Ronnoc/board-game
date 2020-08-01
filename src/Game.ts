import { ILoadable, SerializedGame } from "./Serialized";
import { Database } from "./database/Database";
import { Player } from "./Player";
import { Phase } from "./enums/Phase";
import { GameOptions } from "./GameOptions";

export class Game implements ILoadable<SerializedGame, Game> {
  public activePlayer="";

  public phase: Phase = Phase.START;

  constructor(
    public id: string,
    private players: Array<Player>,
    private first: Player,
    gameOptions: GameOptions,
  ) {
    console.log("Game.constructor");
    Database.getInstance();
  }

  public loadFromJSON(d: SerializedGame): Game {
    console.log(this.first.id); // debug
    return Object.assign(this, d);
  }

  public getPlayers():Array<Player> {
    return this.players;
  }

  public toStringfy():string {
    const rtn = {
      id: this.id,
    };
    return JSON.stringify(rtn);
  }

  public getPlayerById(id:string):Player {
    return this.players.filter((p) => p.id === id)[0];
  }
}
