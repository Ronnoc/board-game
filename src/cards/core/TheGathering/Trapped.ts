import { IAgendaCard } from "../../IAgendaCard";
import { Game } from "../../../Game";

export class Trapped implements IAgendaCard {
  name = "Trapped";

  stage = 1;

  dooms = 3;

  turnOver(game: Game): void {
    console.log(this.name);
  }

  frontText = "front";

  backText = "back";
}
