import { IScenario } from "../../IScenario";
import { WhatsGoingOn } from "./WhatsGoingOn";
import { Trapped } from "./Trapped";
import { Study } from "./Study";
import { ILocationCard } from "../../ILocationCard";
import { EncounterSet } from "../../../enums/EncounterSet";

export class TheGathering extends IScenario {
  mName = "The Gathering";

  mActs = [WhatsGoingOn];

  mAgendas = [Trapped];

  mEncounterSets = [
    EncounterSet.CORE_RATS,
    EncounterSet.CORE_GHOULS,
    EncounterSet.CORE_STRIKING_FEAR,
    EncounterSet.CORE_ANCIENT_EVILS,
    EncounterSet.CORE_CHILLING_COLD,
  ];

  protected initLocation(): Array<ILocationCard> {
    return [new Study()];
  }
}
