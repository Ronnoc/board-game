import { IActCard } from "./IActCard";
import { IAgendaCard } from "./IAgendaCard";
import { IFCard } from "./IFCard";
import { CardType } from "../enums/CardType";

export class IScenario implements IFCard {
  mCardType = CardType.SCENARIO;

  mName = "IScenario";

  mActs?: Array<IActCard> | undefined;

  mAgendas: Array<IAgendaCard> | undefined;
}
