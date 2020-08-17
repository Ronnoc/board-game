import { Game } from "../Game";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";

export class ILocationCard extends ICard {
  mCardType = CardType.LOCATION;

  mName = "ILocationCard";

  mShroud: number | undefined;

  mClues: number | undefined;

  mCluePerInvestigator = false;

  mFrontText = "";

  mBackText = "";

  mVictoryPoint = 0;

  isFront = false;

  checkTurnOver(game: Game): boolean {
    throw new Error(`${this.mName} checkTurnOver NotImplemented`);
    return false;
  }

  protected doTurnOver(game: Game): void {
    throw new Error(`${this.mName} _TurnOver NotImplemented`);
  }

  turnOver(game: Game): void {
    if (this.isFront) {
      console.error("is turned over!");
    }
    this.isFront = true;
    this.doTurnOver(game);
  }
}
