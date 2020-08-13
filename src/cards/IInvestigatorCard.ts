import { CardFaction } from "../enums/CardFaction";
import { Game } from "../Game";
import { Player } from "../Player";
import { IFCard } from "./IFCard";

export class IInvestigatorCard implements IFCard {
  mName = "ILocationCard"

  html(): string {
    return this.mName;
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
