import { EncounterSet } from "../enums/EncounterSet";
import { ITreacheryCard } from "./ITreacheryCard";

export class IEncounterSet {
  static cSetName = EncounterSet.UNKNOWN;

  mName = "IEncounterSet"

  public create(): Array<ITreacheryCard> {
    console.warn(`${this.mName} create not implement`);
    return [];
  }
}
