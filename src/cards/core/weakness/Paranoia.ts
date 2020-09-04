import { CardTrait } from "../../../enums/CardTrait";
import { WeaknessType } from "../../../enums/WeaknessType";
import { Game } from "../../../Game";
import { Player } from "../../../Player";
import { ITreacheryCard } from "../../ITreacheryCard";

export class Paranoia extends ITreacheryCard {
  static cArkhamDBID = "01097"

  mWeaknessType = WeaknessType.BASIC_WEAKNESS;

  mTraits = [CardTrait.MADNESS];

  mName = "Paranoia";

  revelation(player: Player, game: Game): void {
    player.investigator.setResource(0);
  }
}
