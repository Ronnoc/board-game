import { Game } from "../Game";
import { IFCard } from "./IFCard";
import { CardType } from "../enums/CardType";

export class IActCard implements IFCard {
  mCardType = CardType.ACT;

  mName = "IActCard";

  html(): string {
    return this.mName;
  }

  mStage: number | undefined;

  mClues: number | undefined;

  mCluePerInvestigator: boolean | undefined;

  mFrontText: string | undefined;

  mBackText: string | undefined;

  checkTurnOver(game: Game): boolean {
    throw new Error(`${this.mName} checkTurnOver NotImplemented`);
    return false;
  }

  turnOver(game: Game): void {
    throw new Error(`${this.mName} turnOver NotImplemented`);
  }
}
