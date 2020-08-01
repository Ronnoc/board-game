import { ILoadable, SerializedPlayer } from "./Serialized";
import { generateRandomId } from "./utils";
import { Color } from "./enums/Color";
import { Game } from "./Game";
import { PlayerInput } from "./inputs/PlayerInput";

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

  public stateToStringfy(game:Game):string {
    const rtn = {
      id: this.id,
      name: this.name,
      color: this.color,
    };
    return JSON.stringify(rtn);
  }
}
