import { IActCard } from "../../IActCard";
import { Game } from "../../../Game";

export class WhatsGoingOn extends IActCard {
  mName = "What's Going On";

  mStage = 1;

  mClues = 2;

  mCluePerInvestigator = true;

  turnOver(game: Game): void {
    console.log(this.mName);
  }

  mFrontText = "What's Going On front";

  mBackText = "What's Going On back";
}
