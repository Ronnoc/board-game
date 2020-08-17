import { Game } from "../Game";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";

export class IActCard extends ICard {
  mCardType = CardType.ACT;

  mName = "IActCard";

  mStage: number | undefined;

  mClues: number | undefined;

  mCluePerInvestigator: boolean | undefined;

  mFrontText: string | undefined;

  mBackText: string | undefined;

  checkTurnOver(game: Game): boolean {
    throw new Error(`${game.id} ${this.mName} checkTurnOver NotImplemented`);
    return false;
  }

  turnOver(game: Game): void {
    throw new Error(`${game.id} ${this.mName} turnOver NotImplemented`);
  }
}
