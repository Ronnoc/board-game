import { CardType } from "../enums/CardType";

export interface IFCard {
  mName: string;
  mCardType: CardType;
  mArkhamDBID?: string;
}
