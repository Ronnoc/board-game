import { ITreacheryCard } from "./cards/ITreacheryCard";

export class EncounterDealer {
  constructor(
    public deck: Array<ITreacheryCard>,
  ) {
    this.deck = deck;
  }
}
