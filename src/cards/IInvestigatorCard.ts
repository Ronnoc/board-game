import { CardFaction } from "../enums/CardFaction";
import { Game } from "../Game";
import { Player } from "../Player";

export interface IInvestigatorCard {
  name: string;
  faction: CardFaction;
  willpower: number;
  intellect: number;
  combat: number;
  agility: number;
  health: number;
  sanity: number;
  elderSign: (game: Game, player: Player) => number;
  arkhamdbid?: number;
}
