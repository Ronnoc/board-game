import { IEncounterSet } from "../../IEncounterSet";
import { EncounterSet } from "../../../enums/EncounterSet";
import { IEncounterCard } from "../../IEncounterCard";
import { SwarmOfRats } from "./SwarmOfRats";

export class Rats extends IEncounterSet {
  static cSetName = EncounterSet.CORE_RATS;

  mName = "Rats"

  create(): Array<IEncounterCard> {
    return [
      new SwarmOfRats(),
      new SwarmOfRats(),
      new SwarmOfRats(),
    ];
  }
}
