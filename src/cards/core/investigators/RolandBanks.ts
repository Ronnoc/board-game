import { IInvestigatorCard } from "../../IInvestigatorCard";
import { CardFaction } from "../../../enums/CardFaction";
import { Game } from "../../../Game";
import { Player } from "../../../Player";

export class RolandBanks implements IInvestigatorCard {
  name = "Roland Banks";

  faction = CardFaction.GUARDIAN;

  willpower = 3;

  intellect = 3;

  combat = 4;

  agility = 2;

  sanity = 5;

  health = 9;

  elderSign(game: Game, player: Player): number {
    return this.agility;
  }
}
