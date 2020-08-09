import { Game } from "../Game";
import { Player } from "../Player";

export interface ITreacheryCard {
  name: string;
  effect: (game: Game, player: Player) => void;
  arkhamdbid?: number;
}
