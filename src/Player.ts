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

export class Player implements ILoadable<SerializedPlayer, Player> {
  public id = "";

  public investigator = new RolandBanks();

  public deck = debugDecks;

  public cardsInHand: Array<IPlayerCard> = [];

  public cardsDiscarded: Array<IPlayerCard> = [];

  public currentGame = "";

  private waitingFor?: PlayerInput;

  private waitingForCb?: () => void;

  constructor(public name: string, public color: Color) {
    this.id = generateRandomId();
  }

  public loadFromJSON(d: SerializedPlayer): Player {
    return Object.assign(this, d);
  }

  public setCurrentGame(gameId: string): void {
    this.currentGame = gameId;
  }

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

  // private hasInterrupt(game: Game): boolean {
  //   return game.interrupts.find((interrupt) => interrupt.player === this) !== undefined;
  // }

  public getInfo(): IFPlayerInfo {
    return {
      id: this.id,
      name: this.name,
    } as IFPlayerInfo;
  }

  public stateStringify(game: Game): string {
    return JSON.stringify({
      id: this.id,
      gameid: game.id,
      waitingfor: this.waitingFor,
      gameLog: game.gameLog.reverse(),
      players: game.getPlayers(),
    } as IFPlayerGameState);
  }
}
