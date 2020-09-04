import { IInvestigatorCard } from "../../IInvestigatorCard";
import { CardFaction } from "../../../enums/CardFaction";
import { Game } from "../../../Game";
import { Player } from "../../../Player";

export class RolandBanks extends IInvestigatorCard {
  mName = "Roland Banks";

  mFaction = CardFaction.GUARDIAN;

  mWillpower = 3;

  mIntellect = 3;

  mCombat = 4;

  mAgility = 2;

  mSanity = 5;

  mHealth = 9;

  elderSign(game: Game, player: Player): number {
    return 2;
  }
}
