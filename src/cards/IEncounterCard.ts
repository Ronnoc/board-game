import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";
import { WeaknessType } from "../enums/WeaknessType";
import { EncounterType } from "../enums/EncounterType";
import { Player } from "../Player";
import { Game } from "../Game";

export class IEncounterCard extends ICard {
  mCardType = CardType.ENCOUNTER;

  mEncounterType = EncounterType.UNKNOWN;

  mWeaknessType = WeaknessType.NORMAL;

  mName = "IEncounterCard";

  mText = "IEncounterCard.text";

  revelation(player: Player, game: Game): void{
    throw new Error(`${this.mName} revelation NotImplemented`);
  }
}
