import { CardFaction } from "../enums/CardFaction";
import { Game } from "../Game";
import { Player } from "../Player";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";

export class IInvestigatorCard extends ICard {
  mCardType = CardType.INVESTIGATOR;

  mName = "IInvestigatorCard";

  mFaction = CardFaction.UNKNOWN;

  mWillpower: number | undefined;

  mIntellect: number | undefined;

  mCombat: number | undefined;

  mAgility: number | undefined;

  mHealth: number | undefined;

  mSanity: number | undefined;

  curHealth = 0;

  curSanity = 0;

  curResource = 0;

  curPhysicalTrauma = 0;

  curMentalTrauma = 0;

  // set

  setResource(rescoureTarget: number): void {
    this.curResource = rescoureTarget;
  }

  updateResource(rescoureDiff: number): void{
    this.curResource += rescoureDiff;
  }

  preparePhase():void {
    if (this.mHealth === undefined) {
      throw new Error("this.mHealth === undefined");
    }
    if (this.mSanity === undefined) {
      throw new Error("this.mSanity === undefined");
    }
    this.curHealth = this.mHealth - this.curPhysicalTrauma;
    this.curSanity = this.mSanity - this.curMentalTrauma;
    this.curResource = 5;
  }

  mElderSign(game: Game, player: Player): number {
    throw new Error(`${game.id} ${player.id} ${this.mName} mElderSign NotImplemented`);
  }
}
