import { Game } from "../Game";
import { Player } from "../Player";
import { IFCard } from "./IFCard";
import { CardType } from "../enums/CardType";

export class ITreacheryCard implements IFCard {
  mCardType = CardType.TREACHERY;

  mName = "ITreacheryCard";

  mText = "ITreacheryCard.text";

  effect(game: Game, player: Player): void {
    throw new Error(`${this.mName} effect NotImplemented`);
  }
}
