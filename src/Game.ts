import { ILoadable, SerializedGame } from "./Serialized";
import { Database } from "./database/Database";
import { Player } from "./Player";
import { Phase } from "./enums/Phase";
import { IFCreateGameForm } from "./interface/IFCreateGameForm";
import { IFGameInfo } from "./interface/IFGameInfo";
import { PlayerInterrupt } from "./interrupts/PlayerInterrupt";
import { LogMessageData } from "./LogMessageData";
import { LogMessage } from "./LogMessage";
import { ILocationCard } from "./cards/ILocationCard";
import { IScenario } from "./cards/IScenario";
import { TheGathering } from "./cards/core/TheGathering/TheGathering";
import { IAgendaCard } from "./cards/IAgendaCard";
import { IActCard } from "./cards/IActCard";
import { ChaosBag } from "./ChaosBag";
import { IEnemyCard } from "./cards/IEnemyCard";
import { IPlayerCard } from "./cards/IPlayerCard";
import { EncounterDealer } from "./EncounterDealer";
import { IEncounterCard } from "./cards/IEncounterCard";
import { LogMessageDataType } from "./enums/LogMessageDataType";

export type PlayerId = string;
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

  private doneInvestigationPlayers: Set<PlayerId> = new Set<PlayerId>();

  private donePreparePlayers: Set<PlayerId> = new Set<PlayerId>();

  constructor(
    public id: string,
    public players: Array<Player>,
    public first: Player,
    public createGameForm: IFCreateGameForm,
  ) {
    this.log("Init Game");
    Database.getInstance();
    this.id = id;
    this.first = first;
    this.players = players;
    this.scenario = new TheGathering();
    this.scenario.init(this);
    this.gotoPreparePhase();
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

  public needRefresh(num: number): boolean {
    return this.getGameAge() > num;
  }

  // phase
  private gotoPreparePhase(): void {
    this.log("game goto Prepare phase");
    this.phase = Phase.PREPARE;
    this.donePreparePlayers.clear();
    this.players.forEach((player) => {
      player.runPreparePhase(this);
    });
  }

  private allPlayersDonePrepare(): boolean {
    let rtn = true;
    this.players.forEach(
      (player) => {
        if (!this.donePreparePlayers.has(player.id)) {
          rtn = false;
        }
      },
    );
    return rtn;
  }

  public playerFinishedPreparePhase(player: Player): void {
    this.donePreparePlayers.add(player.id);
    this.log(
      "${0} finish prepare",
      new LogMessageData(LogMessageDataType.PLAYER, this.id),
    );
    if (this.allPlayersDonePrepare()) {
      this.gotoInvestigationPhase();
    }
  }

  private gotoInvestigationPhase(): void {
    this.log("game goto Investigation phase");
    this.phase = Phase.INVESTIGATION;
    this.doneInvestigationPlayers.clear();
    this.players.forEach((player) => {
      player.runInvestigationPhase(this);
    });
  }

  private allPlayersDoneInvestigation(): boolean {
    let rtn = true;
    this.players.forEach(
      (player) => {
        if (!this.doneInvestigationPlayers.has(player.id)) {
          rtn = false;
        }
      },
    );
    return rtn;
  }

  public playerFinishedInvestigationPhase(player: Player): void {
    this.doneInvestigationPlayers.add(player.id);
    if (this.allPlayersDoneInvestigation()) {
      this.gotoEnemyPhase();
    }
  }

  private gotoEnemyPhase(): void {
    this.log("game goto Enemy phase");
    this.phase = Phase.ENEMY;
    this.gotoUpkeepPhase();
  }

  private gotoUpkeepPhase(): void {
    this.log("game goto Upkeep phase");
    this.phase = Phase.UPKEEP;
    this.gotoMythosPhase();
  }

  private gotoMythosPhase(): void {
    this.log("game goto Mythos phase");
    this.phase = Phase.MYTHOS;
    this.gotoInvestigationPhase();
  }

  // get
  public getPlayerById(id: string): Player {
    return this.players.filter((p) => p.id === id)[0];
  }

  public getGameAge(): number {
    return this.gameLog[this.gameLog.length - 1].timestamp;
  }

  // set
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

  public setTreacheryCards(encounterCards: Array<IEncounterCard>): void {
    this.encounterDealer = new EncounterDealer(encounterCards);
  }

  public infoStringify(): string {
    return JSON.stringify({
      id: this.id,
      players: this.players.map((p: Player) => p.getInfo()),
    } as IFGameInfo);
  }
}
