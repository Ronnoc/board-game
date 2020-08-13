import { IScenario } from "../../IScenario";
import { WhatsGoingOn } from "./WhatsGoingOn";
import { Trapped } from "./Trapped";

export class TheGathering extends IScenario {
  name = "The Gathering";

  mActs = [new WhatsGoingOn()];

  mAgendas = [new Trapped()];
}
