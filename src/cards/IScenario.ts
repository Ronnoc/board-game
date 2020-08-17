import { IActCard } from "./IActCard";
import { IAgendaCard } from "./IAgendaCard";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";
import { Game } from "../Game";
import { ILocationCard } from "./ILocationCard";
import { ChaosBag } from "../ChaosBag";
import { ChaosToken } from "../enums/ChaosToken";
import { ITreacheryCard } from "./ITreacheryCard";
import { EncounterSetFactory } from "./EncounterSetFactory";
import { EncounterSet } from "../enums/EncounterSet";

export class IScenario extends ICard {
  mCardType = CardType.SCENARIO;

  mName = "IScenario";

  mActs: Array<typeof IActCard> = [];

  mAgendas: Array<typeof IAgendaCard> = [];

  mEncounterSets: Array<EncounterSet> = [];

  mActId = 0;

  mAgendaId = 0;

  init(game: Game): void {
    game.setAct(this.nextAct());
    game.setAgenda(this.nextAgenda());
    game.setLocations(this.initLocation());
    this.initChaosBag(game);
    game.setTreacheryCards(this.initEncounterSet());
  }

  protected initChaosBag(game: Game): void {
    game.setChaosBag(
      new ChaosBag([
        ChaosToken.PLUS_ONE,
        ChaosToken.ZERO,
        ChaosToken.ZERO,
        ChaosToken.MINUS_ONE,
        ChaosToken.MINUS_ONE,
        ChaosToken.MINUS_ONE,
        ChaosToken.MINUS_TWO,
        ChaosToken.MINUS_TWO,
        ChaosToken.MINUS_THREE,
        ChaosToken.MINUS_FOUR,
        ChaosToken.SKULL,
        ChaosToken.SKULL,
        ChaosToken.CULTIST,
        ChaosToken.TOMBSTONE,
        ChaosToken.AUTO_FAIL,
        ChaosToken.ELDER_SIGN,
      ]),
    );
  }

  protected initEncounterSet(): Array<ITreacheryCard> {
    const rtn: Array<ITreacheryCard> = [];
    this.mEncounterSets.forEach((element: EncounterSet): void => {
      const XEncounterSet = EncounterSetFactory.get(element);
      if (XEncounterSet !== undefined) {
        rtn.push(...(new XEncounterSet()).create());
      } else {
        console.warn(`${element} EncounterSet not created`);
      }
    });
    return rtn;
  }

  protected initLocation(): Array<ILocationCard> {
    throw new Error(`${this.mName} initLocation not implement`);
  }

  protected nextAct(): IActCard {
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

  protected nextAgenda(): IAgendaCard {
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
