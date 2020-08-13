import { CardTrait } from "../enums/CardTrait";
import { CardKeyword } from "../enums/CardKeyword";
import { IFCard } from "./IFCard";

export class IEnemyCard implements IFCard {
  mName = "IEnemyCard"

  html(): string {
    return this.mName;
  }

  mTraits: Array<CardTrait> = [];

  mFight: number | undefined;

  mHealth: number | undefined;

  mEvade: number | undefined;

  mDamage: number | undefined;

  mHorror: number | undefined;

  mKeywords: Array<CardKeyword> = [];
}
