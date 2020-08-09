import { IActCard } from "../../IActCard";
import { Game } from "../../../Game";

export class WhatsGoingOn implements IActCard {
  name = "What's Going On";

  stage = 1;

  clues = 2;

  cluePerInvestigator = true;

  turnOver(game: Game): void {
    console.log(this.name);
  }

  frontText = "What's Going On front";

  backText = "What's Going On back";
}
