import { CardType } from "../enums/CardType";
import { generateRandomId } from "../utils";

export class ICard {
  mName = "ICard";

  mCardType = CardType.UNKNOWN;

  static cArkhamDBID: string | undefined = undefined;

  runtimeId: string | undefined;

  constructor() {
    this.runtimeId = generateRandomId();
  }
}
