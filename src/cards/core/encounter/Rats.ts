import { IEncounterSet } from "../../IEncounterSet";
import { EncounterSet } from "../../../enums/EncounterSet";
import { ITreacheryCard } from "../../ITreacheryCard";
import { SwarmOfRats } from "./SwarmOfRats";

export class Rats extends IEncounterSet {
  static cSetName = EncounterSet.CORE_RATS;

  mName = "Rats"

  create(): Array<ITreacheryCard> {
    return [
      new SwarmOfRats(),
      new SwarmOfRats(),
      new SwarmOfRats(),
    ];
  }
}
