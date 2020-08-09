import { IScenario } from "../../IScenario";
import { WhatsGoingOn } from "./WhatsGoingOn";
import { Trapped } from "./Trapped";

export class TheGathering implements IScenario {
  name = "The Gathering";

  acts = [new WhatsGoingOn()];

  agendas = [new Trapped()];
}
