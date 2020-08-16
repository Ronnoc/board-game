import { IAgendaCard } from "../../IAgendaCard";
import { Game } from "../../../Game";

export class Trapped extends IAgendaCard {
  mName = "Trapped";

  mStage = 1;

  mDooms = 3;

  turnOver(game: Game): void {
    console.log(this.mName);
  }

  mFrontText = "front";

  mBackText = "back";
}
