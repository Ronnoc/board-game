import { IAgendaCard } from "../../IAgendaCard";
import { Game } from "../../../Game";

export class Trapped extends IAgendaCard {
  mName = "Trapped";

  mStage = 1;

  mDooms = 3;

  turnOver(game: Game): void {
    game.log(`${this.mName} turnOver`);
  }

  mFrontText = "front";

  mBackText = "back";
}
