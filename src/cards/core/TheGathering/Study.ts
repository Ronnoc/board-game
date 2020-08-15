import { ILocationCard } from "../../ILocationCard";
import { Game } from "../../../Game";

export class Study extends ILocationCard {
  mArkhamDBID = "01111";

  mName = "Study";

  mShroud = 2;

  mClues = 2;

  mCluePerInvestigator = true;

  mBackText =
    "You've been investigating the strange events occurring in Arkham for several days now. Your deck in covered in newspaper articles, police reports, and witness accounts.";

  mFrontText = "The door to your study has vanished.";

  protected doTurnOver(game: Game): void {
    game.log("Study doTurnOver");
  }
}
