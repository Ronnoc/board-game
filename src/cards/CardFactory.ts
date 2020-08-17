import { CoreCards } from "./core/CoreCards";
import { ICard } from "./ICard";

export const CardFactory = new Map<string, typeof ICard>();

function insertCard(XIcard: typeof ICard): void {
  if (XIcard.cArkhamDBID !== undefined) {
    CardFactory.set(XIcard.cArkhamDBID, XIcard);
  } else {
    console.warn(`${(new XIcard()).mName} has no cArkhamDBID`);
  }
}

console.log("Insert CoreCards to CardFactory");
CoreCards.forEach(insertCard);
