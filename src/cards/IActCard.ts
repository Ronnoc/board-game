import { Game } from "../Game";

export interface IActCard {
  name: string;
  stage: number;
  clues: number;
  cluePerInvestigator: boolean;
  checkTurnOver?: (game: Game) => boolean;
  turnOver: (game: Game) => void;
  frontText: string;
  backText: string;
  arkhamdbid?: number;
}
