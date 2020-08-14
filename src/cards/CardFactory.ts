import { CoreCards } from "./core/CoreCards";
import { IFCard } from "./IFCard";

export const CardFactory = new Map<string, IFCard>();

console.log("Insert CoreCards to CardFactory");
CoreCards.forEach((cardConstructor: () => IFCard) => {
  const card = cardConstructor();
  if (card.mArkhamDBID !== undefined) {
    CardFactory.set(card.mArkhamDBID, card);
  }
});
