import { CardFaction } from "../enums/CardFaction";
import { Game } from "../Game";
import { Player } from "../Player";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";

export class IInvestigatorCard extends ICard {
  mCardType = CardType.INVESTIGATOR;

  mName = "IInvestigatorCard";

  mFaction = CardFaction.UNKNOWN;

  mWillpower: number | undefined;

  mIntellect: number | undefined;

  mCombat: number | undefined;

  mAgility: number | undefined;

  mHealth: number | undefined;

  mSanity: number | undefined;

  elderSign(game: Game, player: Player): number {
    throw new Error(`${game.id} ${player.id} ${this.mName} turnOver NotImplemented`);
  }
}
