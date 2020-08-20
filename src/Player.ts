import { ILoadable, SerializedPlayer } from "./Serialized";
import { generateRandomId } from "./utils";
import { Color } from "./enums/Color";
import { Game } from "./Game";
import { PlayerInput } from "./inputs/PlayerInput";
import { IFPlayerGameState } from "./interface/IFPlayerGameState";
import { IFPlayerInfo } from "./interface/IFPlayerInfo";
import { RolandBanks } from "./cards/core/investigators/RolandBanks";
import { debugDecks } from "./DeckDealer";
import { IPlayerCard } from "./cards/IPlayerCard";
import { SelectOption } from "./inputs/SelectOption";
import { OrOptions } from "./inputs/OrOptions";
import { ILocationCard } from "./cards/ILocationCard";
import { LogMessageData } from "./LogMessageData";
import { LogMessageDataType } from "./enums/LogMessageDataType";

export class Player implements ILoadable<SerializedPlayer, Player> {
  public id = "";

  public investigator = new RolandBanks();

  public deck = debugDecks;

  public cardsInHand: Array<IPlayerCard> = [];

  public cardsDiscarded: Array<IPlayerCard> = [];

  public assets: Array<IPlayerCard> = [];

  public threats: Array<IPlayerCard> = [];

  public atLocation: ILocationCard | undefined;

  public currentGame = "";

  private waitingFor?: PlayerInput;

  private waitingForCb?: () => void;

  constructor(public name: string, public color: Color) {
    this.id = generateRandomId();
  }

  private count = 1;

  public getDebugOption(game: Game): OrOptions {
    this.count += 1;
    this.count = Math.min(this.count, 5);
    const debugOptions = new OrOptions();
    for (let i = 0; i < this.count; i += 1) {
      debugOptions.options.push(
        new SelectOption(String(i), () => {
          game.log(
            `\${0} select ${String(i)}`,
            new LogMessageData(LogMessageDataType.PLAYER, this.id),
          );
          if (!game.locations[0].isFront) {
            game.locations[0].turnOver(game);
          }
          return undefined;
        }),
      );
    }
    return debugOptions;
  }

  // load
  public loadFromJSON(d: SerializedPlayer): Player {
    return Object.assign(this, d);
  }

  // set
  public setCurrentGame(gameId: string): void {
    this.currentGame = gameId;
  }
  // get

  // phase
  public runInvestigationPhase(game: Game): void {
    this.setWaitingFor(this.getDebugOption(game), () => {
      game.playerFinishedInvestigationPhase(this);
    });
  }

  // waiting for
  public process(game: Game, input: Array<Array<string>>): void {
    if (this.waitingFor === undefined || this.waitingForCb === undefined) {
      throw new Error("Not waiting for anything");
    }
    const { waitingFor } = this;
    const { waitingForCb } = this;
    this.waitingFor = undefined;
    this.waitingForCb = undefined;
    try {
      this.runInput(game, input, waitingFor);
      waitingForCb();
    } catch (err) {
      this.waitingFor = waitingFor;
      this.waitingForCb = waitingForCb;
      throw err;
    }
  }

  public getWaitingFor(): PlayerInput | undefined {
    return this.waitingFor;
  }

  public setWaitingFor(input: PlayerInput, cb: () => void): void {
    this.waitingFor = input;
    this.waitingForCb = cb;
  }

  private runInputCb(game: Game, result: PlayerInput | undefined): void {
    if (result !== undefined) {
      game.interrupts.push({
        player: this,
        playerInput: result,
      });
    }
  }

  private runInput(
    game: Game,
    input: Array<Array<string>>,
    pi: PlayerInput,
  ): void {
    if (pi instanceof SelectOption) {
      this.runInputCb(game, pi.cb());
    } else if (pi instanceof OrOptions) {
      const waiting: OrOptions = pi;
      const optionIndex = parseInt(input[0][0], 10);
      const remainingInput = input[0].slice();
      // Remove option index to process option
      remainingInput.shift();
      this.runInput(game, [remainingInput], waiting.options[optionIndex]);
    } else {
      throw new Error("Unsupported waitingFor");
    }
  }

  // output
  public getInfo(): IFPlayerInfo {
    return {
      id: this.id,
      name: this.name,
    } as IFPlayerInfo;
  }

  public stateStringify(game: Game): string {
    return JSON.stringify({
      // player
      id: this.id,
      investigator: this.investigator,
      atLocation: this.atLocation,
      cardsInHand: this.cardsInHand,
      cardsDiscarded: this.cardsDiscarded,
      assets: this.assets,
      threats: this.threats,
      waitingFor: this.waitingFor,
      // game
      gameId: game.id,
      phase: game.phase,
      gameLog: game.gameLog,
      players: game.players,
      locations: game.locations,
      npcs: game.npcs,
      act: game.act,
      agenda: game.agenda,
      scenario: game.scenario,
      chaosBag: game.chaosBag,
      gameAge: game.getGameAge(),
    } as IFPlayerGameState);
  }
}
