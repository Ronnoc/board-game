import { IActCard } from "./IActCard";
import { IAgendaCard } from "./IAgendaCard";
import { IFCard } from "./IFCard";

export class IScenario implements IFCard {
  mName = "IScenario"

  html(): string {
    return this.mName;
  }

  mActs?: Array<IActCard> | undefined

  mAgendas: Array<IAgendaCard> | undefined
}
