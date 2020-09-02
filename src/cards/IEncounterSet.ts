import { EncounterSet } from "../enums/EncounterSet";
import { IEncounterCard } from "./IEncounterCard";

export class IEncounterSet {
  static cSetName = EncounterSet.UNKNOWN;

  mName = "IEncounterSet"

  public create(): Array<IEncounterCard> {
    console.warn(`${this.mName} create not implement`);
    return [];
  }
}
