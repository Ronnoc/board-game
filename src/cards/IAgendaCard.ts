import { Game } from "../Game";

export interface IAgendaCard {
  name: string;
  stage: number;
  dooms: number;
  checkTurnOver?: (game: Game) => boolean;
  turnOver: (game: Game) => void;
  frontText: string;
  backText: string;
  arkhamdbid?: number;
}
