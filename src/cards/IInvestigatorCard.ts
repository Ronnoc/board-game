import { CardFaction } from "../enums/CardFaction";
import { Game } from "../Game";
import { Player } from "../Player";
import { IFCard } from "./IFCard";
import { CardType } from "../enums/CardType";

export class IInvestigatorCard implements IFCard {
  mCardType = CardType.INVESTIGATOR;

  mName = "IInvestigatorCard";

  html(card: IInvestigatorCard): string {
    return card.mName;
  }

  mFaction = CardFaction.UNKNOWN;

  mWillpower: number | undefined;

  mIntellect: number | undefined;

  mCombat: number | undefined;

  mAgility: number | undefined;

  mHealth: number | undefined;

  mSanity: number | undefined;

  elderSign(game: Game, player: Player): number {
    throw new Error(`${this.mName} turnOver NotImplemented`);
  }
}
