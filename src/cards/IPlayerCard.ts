import { CardType } from "../enums/CardType";
import { CardFaction } from "../enums/CardFaction";
import { CardTrait } from "../enums/CardTrait";
import { SkillIcon } from "../enums/SkillIcon";
import { Game } from "../Game";
import { Player } from "../Player";
import { IFCard } from "./IFCard";

export class IPlayerCard implements IFCard {
  mName = "IPlayerCard"

  html(): string {
    return this.mName;
  }

  mCost?: number;

  mXP?: number;

  mFaction = CardFaction.UNKNOWN;

  mType = CardType.UNKNOWN;

  mTraits?: Array<CardTrait>;

  mTestIcons?: Array<SkillIcon>;

  mText = "IPlayerCard.text";

  canPlay(player: Player, game: Game): boolean {
    throw new Error(`${this.mName} canPlay NotImplemented`);
  }
}
