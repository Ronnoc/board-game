import { IEncounterCard } from "./IEncounterCard";
import { EncounterType } from "../enums/EncounterType";

export class ITreacheryCard extends IEncounterCard {
  mEncounterType = EncounterType.TREACHERY;
}
