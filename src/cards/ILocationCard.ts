import { Game } from "../Game";
import { IFCard } from "./IFCard";

export class ILocationCard implements IFCard {
  mName = "ILocationCard"

  html(): string {
    return this.mName;
  }

  mShroud: number | undefined;

  mClues: number | undefined;

  mCluePerInvestigator = false;

  mFrontText = "";

  mBackText = "";

  checkTurnOver(game: Game): boolean {
    throw new Error(`${this.mName} checkTurnOver NotImplemented`);
    return false;
  }

  turnOver(game: Game): void {
    throw new Error(`${this.mName} turnOver NotImplemented`);
  }
}
