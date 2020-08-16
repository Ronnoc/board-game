import { IActCard } from "./IActCard";
import { IAgendaCard } from "./IAgendaCard";
import { IFCard } from "./IFCard";
import { CardType } from "../enums/CardType";
import { Game } from "../Game";
import { ILocationCard } from "./ILocationCard";

export class IScenario implements IFCard {
  mCardType = CardType.SCENARIO;

  mName = "IScenario";

  mActs: Array<typeof IActCard> | undefined;

  mAgendas: Array<typeof IAgendaCard> | undefined;

  mActId = 0;

  mAgendaId = 0;

  init(game:Game):void {
    game.setAct(this.nextAct());
    game.setAgenda(this.nextAgenda());
    game.setLocations(this.initLocation());
  }

  protected initLocation():Array<ILocationCard> {
    throw new Error(`${this.mName} initLocation not implement`);
  }

  protected nextAct():IActCard {
    if (this.mActs === undefined) {
      throw new Error(`${this.mName} this.mActs === undefined`);
    }
    if (this.mActId >= this.mActs.length) {
      throw new Error(`${this.mName} this.mActId >= this.mActs.length`);
    }
    const act = new this.mActs[this.mActId]();
    this.mActId += 1;
    return act;
  }

  protected nextAgenda():IAgendaCard {
    if (this.mAgendas === undefined) {
      throw new Error(`${this.mName} this.mAgendas === undefined`);
    }
    if (this.mAgendaId >= this.mAgendas.length) {
      throw new Error(`${this.mName} this.mAgendaId >= this.mAgendas.length`);
    }
    const agenda = new this.mAgendas[this.mAgendaId]();
    this.mAgendaId += 1;
    return agenda;
  }
}
