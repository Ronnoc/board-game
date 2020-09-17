import { IActCard } from "./IActCard";
import { IAgendaCard } from "./IAgendaCard";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";
import { Game } from "../Game";
import { ChaosBag } from "../ChaosBag";
import { ChaosToken } from "../enums/ChaosToken";
import { EncounterSetFactory } from "./EncounterSetFactory";
import { EncounterSet } from "../enums/EncounterSet";
import { IEncounterCard } from "./IEncounterCard";
import { Player } from "../Player";

export class IScenario extends ICard {
  mCardType = CardType.SCENARIO;

  mName = "IScenario";

  mActs: Array<typeof IActCard> = [];

  mAgendas: Array<typeof IAgendaCard> = [];

  mEncounterSets: Array<EncounterSet> = [];

  actId = 0;

  agendaId = 0;

  init(game: Game): void {
    game.setAct(this.nextAct());
    game.setAgenda(this.nextAgenda());
    this.initLocation(game);
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
        ChaosToken.CULTIST,
        ChaosToken.SKULL,
        ChaosToken.CULTIST,
        ChaosToken.TOMBSTONE,
        ChaosToken.AUTO_FAIL,
        ChaosToken.ELDER_SIGN,
      ]),
    );
  }

  protected initEncounterSet(): Array<IEncounterCard> {
    const rtn: Array<IEncounterCard> = [];
    this.mEncounterSets.forEach((element: EncounterSet): void => {
      const XEncounterSet = EncounterSetFactory.get(element);
      if (XEncounterSet !== undefined) {
        rtn.push(...(new XEncounterSet()).create());
      } else {
        console.warn(`IScenario.ts:: ${element} EncounterSet not created`);
      }
    });
    return rtn;
  }

  protected initLocation(game:Game): void {
    throw new Error(`${this.mName} initLocation not implement`);
  }

  protected nextAct(): IActCard {
    if (this.mActs === undefined) {
      throw new Error(`${this.mName} this.mActs === undefined`);
    }
    if (this.actId >= this.mActs.length) {
      throw new Error(`${this.mName} this.actId >= this.mActs.length`);
    }
    const act = new this.mActs[this.actId]();
    this.actId += 1;
    return act;
  }

  protected nextAgenda(): IAgendaCard {
    if (this.mAgendas === undefined) {
      throw new Error(`${this.mName} this.mAgendas === undefined`);
    }
    if (this.agendaId >= this.mAgendas.length) {
      throw new Error(`${this.mName} this.agendaId >= this.mAgendas.length`);
    }
    const agenda = new this.mAgendas[this.agendaId]();
    this.agendaId += 1;
    return agenda;
  }

  mSkull(game: Game, player: Player): number {
    throw new Error(`${game.id} ${player.id} ${this.mName} mSkull NotImplemented`);
  }

  mCultist(game: Game, player: Player): number {
    throw new Error(`${game.id} ${player.id} ${this.mName} mCultist NotImplemented`);
  }

  mTombstone(game: Game, player: Player): number {
    throw new Error(`${game.id} ${player.id} ${this.mName} mTombstone NotImplemented`);
  }

  mTentacles(game: Game, player: Player): number {
    throw new Error(`${game.id} ${player.id} ${this.mName} mTentacles NotImplemented`);
  }
}
