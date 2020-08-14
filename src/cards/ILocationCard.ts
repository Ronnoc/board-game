import { Game } from "../Game";
import { IFCard } from "./IFCard";

export class ILocationCard implements IFCard {
  mName = "ILocationCard"

  mShroud: number | undefined;

  mClues: number | undefined;

  mCluePerInvestigator = false;

  mFrontText = "";

  mBackText = "";

  resource: number | undefined;

  resourceName: string | undefined;

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
