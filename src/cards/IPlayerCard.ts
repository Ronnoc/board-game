import { CardType } from "../enums/CardType";
import { CardFaction } from "../enums/CardFaction";
import { CardTrait } from "../enums/CardTrait";
import { SkillIcon } from "../enums/SkillIcon";
import { Game } from "../Game";
import { Player } from "../Player";

export interface IPlayerCard {
  name: string;
  cost: number;
  XP: number;
  faction: CardFaction;
  type: CardType;
  traits: Array<CardTrait>;
  testIcons: Array<SkillIcon>;
  text: string;
  canPlay?: (player: Player, game: Game, bonusMc?: number) => boolean;
  arkhamdbid?: number;
}
