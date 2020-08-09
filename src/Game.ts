import { ILoadable, SerializedGame } from "./Serialized";
import { Database } from "./database/Database";
import { Player } from "./Player";
import { Phase } from "./enums/Phase";
import { IFCreateGameForm } from "./inferface/IFCreateGameForm";
import { IFGameInfo } from "./inferface/IFGameInfo";

export class Game implements ILoadable<SerializedGame, Game> {
  public activePlayer="";

  public phase: Phase = Phase.START;

  constructor(
    public id: string,
    private players: Array<Player>,
    private first: Player,
    createGameForm: IFCreateGameForm,
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

  public getPlayerById(id:string):Player {
    return this.players.filter((p) => p.id === id)[0];
  }

  public infoStringify():string {
    return JSON.stringify(
      {
        id: this.id,
        players: this.players.map((p:Player) => p.getInfo()),
      } as IFGameInfo,
    );
  }
}
