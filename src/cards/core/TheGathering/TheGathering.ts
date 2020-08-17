import { IScenario } from "../../IScenario";
import { WhatsGoingOn } from "./WhatsGoingOn";
import { Trapped } from "./Trapped";
import { Study } from "./Study";
import { ILocationCard } from "../../ILocationCard";
import { EncounterSet } from "../../../enums/EncounterSet";
import { ITreacheryCard } from "../../ITreacheryCard";
import { EncounterSetFactory } from "../../EncounterSetFactory";

export class TheGathering extends IScenario {
  mName = "The Gathering";

  mActs = [WhatsGoingOn];

  mAgendas = [Trapped];

  mEncounterSets = [
    EncounterSet.CORE_THE_GATHERING,
    EncounterSet.CORE_RATS,
    EncounterSet.CORE_GHOULS,
    EncounterSet.CORE_STRIKING_FEAR,
    EncounterSet.CORE_ANCIENT_EVILS,
    EncounterSet.CORE_CHILLING_COLD,
  ];

  protected initLocation(): Array<ILocationCard> {
    return [new Study()];
  }

  protected initEncounterSet(): Array<ITreacheryCard> {
    const rtn: Array<ITreacheryCard> = [];
    this.mEncounterSets.forEach((element: EncounterSet): void => {
      const XEncounterSet = EncounterSetFactory.get(element);
      if (XEncounterSet !== undefined) {
        rtn.push(...(new XEncounterSet()).create());
      }
    });
    return rtn;
  }
}
