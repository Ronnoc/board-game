import { ILoadable, SerializedGame } from "./Serialized";
import { Database } from "./database/Database";
import { Player } from "./Player";
import { Phase } from "./enums/Phase";
import { IFCreateGameForm } from "./interface/IFCreateGameForm";
import { IFGameInfo } from "./interface/IFGameInfo";
import { PlayerInterrupt } from "./interrupts/PlayerInterrupt";
import { OrOptions } from "./inputs/OrOptions";
import { SelectOption } from "./inputs/SelectOption";
import { LogMessageData } from "./LogMessageData";
import { LogMessage } from "./LogMessage";
import { LogMessageDataType } from "./enums/LogMessageDataType";

export class Game implements ILoadable<SerializedGame, Game> {
  phase = Phase.START;

  interrupts: Array<PlayerInterrupt> = [];

  gameLog: Array<LogMessage> = [];

  private count = 3;

  private getDebugOption(): OrOptions {
    this.count += 1;
    const debugOptions = new OrOptions();
    for (let i = 0; i < this.count; i += 1) {
      debugOptions.options.push(
        new SelectOption(String(i), () => {
          this.log(
            `\${0} select ${String(i)}`,
            new LogMessageData(LogMessageDataType.PLAYER, this.first.id),
          );
          return undefined;
        }),
      );
    }
    return debugOptions;
  }

  private getDebugWaitingFor(): () => void {
    return () => {
      console.log(`setWaitingFor debugOptions callback done ${this.count}`);
      this.first.setWaitingFor(this.getDebugOption(), this.getDebugWaitingFor());
    };
  }

  constructor(
    public id: string,
    private players: Array<Player>,
    private first: Player,
    createGameForm: IFCreateGameForm,
  ) {
    Database.getInstance();
    this.id = id;
    this.first = first;
    this.players = players;
    this.players.forEach((player) => {
      player.setWaitingFor(
        this.getDebugOption(),
        this.getDebugWaitingFor(),
      );
    });
  }

  public log(message: string, ...data: LogMessageData[]): void {
    this.gameLog.push(new LogMessage(message, data));
    if (this.gameLog.length > 100) {
      (this.gameLog.shift());
    }
  }

  public loadFromJSON(d: SerializedGame): Game {
    console.log(this.first.id); // debug
    return Object.assign(this, d);
  }

  public getPlayers(): Array<Player> {
    return this.players;
  }

  public getPlayerById(id: string): Player {
    return this.players.filter((p) => p.id === id)[0];
  }

  public infoStringify(): string {
    return JSON.stringify({
      id: this.id,
      players: this.players.map((p: Player) => p.getInfo()),
    } as IFGameInfo);
  }
}
