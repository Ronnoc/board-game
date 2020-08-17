import { IPlayerCard } from "./cards/IPlayerCard";
import { Roland38Special } from "./cards/core/investigators/Roland38Special";

export const debugDecks: Array<IPlayerCard> = [new Roland38Special()];

export class DeckDealer {
  constructor(
    public deck:IPlayerCard[],
  ) {
    this.deck = deck;
  }
}
