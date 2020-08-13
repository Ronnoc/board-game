import { Game } from "../Game";
import { IFCard } from "./IFCard";

export class IAgendaCard implements IFCard {
  mName = "IAgendaCard"

  html(): string {
    return this.mName;
  }

  mStage: number | undefined;

  mDooms: number | undefined;

  checkTurnOver(game: Game): boolean {
    throw new Error(`${this.mName} checkTurnOver NotImplemented`);
    return false;
  }

  turnOver(game: Game): void {
    throw new Error(`${this.mName} turnOver NotImplemented`);
  }

  frontText = "";

  backText = "";
}
