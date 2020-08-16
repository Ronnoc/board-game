import { IScenario } from "../../IScenario";
import { WhatsGoingOn } from "./WhatsGoingOn";
import { Trapped } from "./Trapped";
import { Study } from "./Study";
import { ILocationCard } from "../../ILocationCard";

export class TheGathering extends IScenario {
  mName = "The Gathering";

  mActs = [WhatsGoingOn];

  mAgendas = [Trapped];

  protected initLocation(): Array<ILocationCard> {
    return [new Study()];
  }
}
