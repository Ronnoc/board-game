import { Game } from "../Game";
import { ICard } from "./ICard";
import { CardType } from "../enums/CardType";

export class IAgendaCard extends ICard {
  mCardType = CardType.AGENDA;

  mName = "IAgendaCard";

  mStage: number | undefined;

  mDooms: number | undefined;

  mFrontText = "";

  mBackText = "";

  checkTurnOver(game: Game): boolean {
    throw new Error(`${this.mName} checkTurnOver NotImplemented`);
    return false;
  }

  turnOver(game: Game): void {
    throw new Error(`${this.mName} turnOver NotImplemented`);
  }
}
