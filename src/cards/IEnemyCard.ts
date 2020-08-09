import { CardTrait } from "../enums/CardTrait";
import { CardKeyword } from "../enums/CardKeyword";

export interface IEnemyCard {
  name: string;
  traits: Array<CardTrait>;
  fight: number;
  health: number;
  evade: number;
  damage: number;
  horror: number;
  keywords: Array<CardKeyword>;
  arkhamdbid?: number;
}
