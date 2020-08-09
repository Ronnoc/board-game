import { Game } from "../Game";

export interface ILocationCard {
  name: string;
  shroud: number;
  clues: number;
  cluePerInvestigator: boolean;
  checkTurnOver?: (game: Game) => boolean;
  turnOver: (game: Game) => void;
  frontText: string;
  backText: string;
  arkhamdbid?: number;
}
