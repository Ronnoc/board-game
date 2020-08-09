import { ILoadable, SerializedPlayer } from "./Serialized";
import { generateRandomId } from "./utils";
import { Color } from "./enums/Color";
import { Game } from "./Game";
import { PlayerInput } from "./inputs/PlayerInput";
import { IFPlayerGameState } from "./inferface/IFPlayerGameState";
import { IFPlayerInfo } from "./inferface/IFPlayerInfo";

export class Player implements ILoadable<SerializedPlayer, Player> {
  public id="";

  public currentGame="";

  private waitingFor?: PlayerInput;

  constructor(
    public name: string,
    public color: Color,
  ) {
    this.id = generateRandomId();
  }

  public loadFromJSON(d: SerializedPlayer): Player {
    return Object.assign(this, d);
  }

  public setCurrentGame(gameId:string):void{
    this.currentGame = gameId;
  }

  public process(game: Game, input: Array<Array<string>>): void {
    console.log("process", this.id);
  }

  public getWaitingFor(): PlayerInput | undefined {
    return this.waitingFor;
  }

  public getInfo():IFPlayerInfo {
    return {
      id: this.id,
      name: this.name,
    } as IFPlayerInfo;
  }

  public stateStringify(game:Game):string {
    return JSON.stringify(
      {
        id: this.id,
        gameid: game.id,
      } as IFPlayerGameState,
    );
  }
}
