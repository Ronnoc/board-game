import { CardTrait } from "../enums/CardTrait";
import { CardKeyword } from "../enums/CardKeyword";
import { CardType } from "../enums/CardType";
import { ITreacheryCard } from "./ITreacheryCard";

export class IEnemyCard extends ITreacheryCard {
  mCardType = CardType.ENEMY;

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
