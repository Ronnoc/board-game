import { Game } from "../Game";
import { Player } from "../Player";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";

export class ITreacheryCard extends ICard {
  mCardType = CardType.TREACHERY;

  mName = "ITreacheryCard";

  mText = "ITreacheryCard.text";

  effect(game: Game, player: Player): void {
    throw new Error(`${this.mName} effect NotImplemented`);
  }
}
