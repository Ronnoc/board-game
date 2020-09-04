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

  protected checkTurnOver(game: Game): boolean {
    return true;
  }

  protected doTurnOver(game: Game): void {
    game.log(`${this.mName}::${this.mFrontText}`);
  }

  turnOver(game: Game): void {
    if (!this.isFront && this.checkTurnOver(game)) {
      this.isFront = true;
      this.doTurnOver(game);
    }
  }
}
