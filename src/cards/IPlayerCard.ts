import { CardType } from "../enums/CardType";
import { CardFaction } from "../enums/CardFaction";
import { SkillIcon } from "../enums/SkillIcon";
import { Game } from "../Game";
import { Player } from "../Player";
import { ICard } from "./ICard";
import { PlayerCardType } from "../enums/PlayerCardType";

export class IPlayerCard extends ICard {
  mCardType = CardType.PLAYER;

  mName = "IPlayerCard";

  mCost?: number;

  mXP?: number;

  mFaction = CardFaction.UNKNOWN;

  mType = PlayerCardType.UNKNOWN;

  mTestIcons?: Array<SkillIcon>;

  mText = "IPlayerCard.text";

  canPlay(player: Player, game: Game): boolean {
    throw new Error(`${game.id} ${player.id} ${this.mName} canPlay NotImplemented`);
  }
}
