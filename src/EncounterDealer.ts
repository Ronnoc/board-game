import { IEncounterCard } from "./cards/IEncounterCard";

export class EncounterDealer {
  constructor(
    public deck: Array<IEncounterCard>,
  ) {
    this.deck = deck;
  }
}
