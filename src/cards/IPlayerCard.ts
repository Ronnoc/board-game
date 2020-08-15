import { CardType } from "../enums/CardType";
import { CardFaction } from "../enums/CardFaction";
import { CardTrait } from "../enums/CardTrait";
import { SkillIcon } from "../enums/SkillIcon";
import { Game } from "../Game";
import { Player } from "../Player";
import { IFCard } from "./IFCard";
import { PlayerCardType } from "../enums/PlayerCardType";

export class IPlayerCard implements IFCard {
  mCardType = CardType.PLAYER;

  mName = "IPlayerCard";

  mCost?: number;

  mXP?: number;

  mFaction = CardFaction.UNKNOWN;

  mType = PlayerCardType.UNKNOWN;

  mTraits?: Array<CardTrait>;

  mTestIcons?: Array<SkillIcon>;

  mText = "IPlayerCard.text";

  canPlay(player: Player, game: Game): boolean {
    throw new Error(`${this.mName} canPlay NotImplemented`);
  }
}
