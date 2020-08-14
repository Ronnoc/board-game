import { Game } from "../Game";
import { Player } from "../Player";
import { IFCard } from "./IFCard";

export class ITreacheryCard implements IFCard {
  mName = "ITreacheryCard"

  mText = "ITreacheryCard.text";

  effect(game: Game, player: Player): void {
    throw new Error(`${this.mName} effect NotImplemented`);
  }
}
