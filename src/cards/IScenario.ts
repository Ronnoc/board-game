import { IActCard } from "./IActCard";
import { IAgendaCard } from "./IAgendaCard";
import { IFCard } from "./IFCard";

export class IScenario implements IFCard {
  mName = "IScenario"

  mActs?: Array<IActCard> | undefined

  mAgendas: Array<IAgendaCard> | undefined
}
