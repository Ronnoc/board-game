import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";
import { WeaknessType } from "../enums/WeaknessType";
import { EncounterType } from "../enums/EncounterType";

export class IEncounterCard extends ICard {
  mCardType = CardType.ENCOUNTER;

  mEncounterType = EncounterType.UNKNOWN;

  mWeaknessType = WeaknessType.NORMAL;

  mName = "IEncounterCard";

  mText = "IEncounterCard.text";
}
