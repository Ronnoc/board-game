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
import { ILocationCard } from "./cards/ILocationCard";
import { IScenario } from "./cards/IScenario";
import { TheGathering } from "./cards/core/TheGathering/TheGathering";
import { IAgendaCard } from "./cards/IAgendaCard";
import { IActCard } from "./cards/IActCard";
import { ChaosBag } from "./ChaosBag";
import { IEnemyCard } from "./cards/IEnemyCard";
import { IPlayerCard } from "./cards/IPlayerCard";
import { EncounterDealer } from "./EncounterDealer";
import { ITreacheryCard } from "./cards/ITreacheryCard";

export class Game implements ILoadable<SerializedGame, Game> {
  phase = Phase.UNKNOWN;

  interrupts: Array<PlayerInterrupt> = [];

  gameLog: Array<LogMessage> = [];

  locations: Array<ILocationCard> = [];

  npcs: Array<IEnemyCard | IPlayerCard> = [];

  scenario: IScenario | undefined;

  agenda: IAgendaCard | undefined;

  act: IActCard | undefined;

  chaosBag: ChaosBag | undefined;

  encounterDealer: EncounterDealer | undefined;

  private count = 1;

  private getDebugOption(): OrOptions {
    this.count += 1;
    this.count = Math.min(this.count, 5);
    const debugOptions = new OrOptions();
    for (let i = 0; i < this.count; i += 1) {
      debugOptions.options.push(
        new SelectOption(String(i), () => {
          this.log(
            `\${0} select ${String(i)}`,
            new LogMessageData(LogMessageDataType.PLAYER, this.first.id),
          );
          if (!this.locations[0].isFront) {
            this.locations[0].turnOver(this);
          }
          console.log(`choice ${i}`);
          return undefined;
        }),
      );
    }
    return debugOptions;
  }

  private getDebugWaitingFor(): () => void {
    return () => {
      this.first.setWaitingFor(
        this.getDebugOption(),
        this.getDebugWaitingFor(),
      );
    };
  }

  constructor(
    public id: string,
    public players: Array<Player>,
    public first: Player,
    public createGameForm: IFCreateGameForm,
  ) {
    Database.getInstance();
    this.id = id;
    this.first = first;
    this.players = players;
    this.phase = Phase.INVESTIGATION;
    this.scenario = new TheGathering();
    this.scenario.init(this);
    this.players.forEach((player) => {
      player.setWaitingFor(this.getDebugOption(), this.getDebugWaitingFor());
    });
  }

  public log(message: string, ...data: LogMessageData[]): void {
    this.gameLog.push(new LogMessage(message, data));
    if (this.gameLog.length > 100) {
      this.gameLog.shift();
    }
  }

  public loadFromJSON(d: SerializedGame): Game {
    console.log(this.first.id); // debug
    return Object.assign(this, d);
  }

  public getPlayerById(id: string): Player {
    return this.players.filter((p) => p.id === id)[0];
  }

  public setAct(act: IActCard): void {
    this.act = act;
  }

  public setAgenda(agenda: IAgendaCard): void {
    this.agenda = agenda;
  }

  public setChaosBag(chaosBag: ChaosBag): void {
    this.chaosBag = chaosBag;
  }

  public setLocations(locations: Array<ILocationCard>): void {
    this.locations = locations;
  }

  public setTreacheryCards(treacheryCards: Array<ITreacheryCard>): void {
    this.encounterDealer = new EncounterDealer(treacheryCards);
  }

  public infoStringify(): string {
    return JSON.stringify({
      id: this.id,
      players: this.players.map((p: Player) => p.getInfo()),
    } as IFGameInfo);
  }
}
