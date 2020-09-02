import { CardTrait } from "../enums/CardTrait";
import { CardKeyword } from "../enums/CardKeyword";
import { IEncounterCard } from "./IEncounterCard";
import { EncounterType } from "../enums/EncounterType";

export class IEnemyCard extends IEncounterCard {
  mEncounterType = EncounterType.TREACHERY;

  mName = "IEnemyCard";

  mText = "IEnemyCard.text";

  mTraits: Array<CardTrait> = [];

  mFight: number | undefined;

  mHealth: number | undefined;

  mEvade: number | undefined;

  mDamage: number | undefined;

  mHorror: number | undefined;

  mKeywords: Array<CardKeyword> = [];
}
