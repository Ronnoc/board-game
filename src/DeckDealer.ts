import { Roland38Special } from "./cards/core/investigators/Roland38Special";
import { ICard } from "./cards/ICard";
import { shuffle } from "./utils";
import { CoverUp } from "./cards/core/investigators/CoverUp";

export const debugDecks: Array<ICard> = [
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new Roland38Special(),
  new CoverUp(),
  new CoverUp(),
  new CoverUp(),
];

export class DeckDealer {
  public discarded: Array<ICard> = [];

  constructor(
    public deck:ICard[],
  ) {
    this.deck = deck;
  }

  public discard(card: ICard): void {
    this.discarded.push(card);
  }

  private draw():ICard {
    if (this.deck.length === 0) {
      this.deck = shuffle(this.discarded);
      this.discarded = [];
    }
    const rtn = this.deck.shift();
    if (rtn === undefined) {
      throw new Error("Unexpected empty deck");
    }
    return rtn;
  }

  public shuffleDeck():void{
    this.deck = shuffle(this.deck);
  }

  public putInDeck(card: ICard):void{
    this.deck.push(card);
  }

  public drawCard(skipFunc?: (card:ICard) => boolean):ICard {
    let result = this.draw();
    if (skipFunc !== undefined) {
      const skipCards = [];
      while (skipFunc(result)) {
        skipCards.push(result);
        result = this.drawCard();
      }
      skipCards.forEach((card) => this.putInDeck(card));
      this.shuffleDeck();
    }
    return result;
  }
}
