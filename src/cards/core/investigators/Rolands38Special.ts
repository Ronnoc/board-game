import { IPlayerCard } from "../../IPlayerCard";
import { CardFaction } from "../../../enums/CardFaction";
import { CardType } from "../../../enums/CardType";
import { CardTrait } from "../../../enums/CardTrait";
import { SkillIcon } from "../../../enums/SkillIcon";

export class Rolands38Special implements IPlayerCard {
  name = "Rolands38Special";

  cost = 3;

  XP = 0;

  faction = CardFaction.GUARDIAN;

  type = CardType.ASSET;

  traits = [CardTrait.ITEM, CardTrait.WEAPON, CardTrait.FIREARM];

  testIcons = [SkillIcon.COMBAT, SkillIcon.AGILITY, SkillIcon.WILD];

  text =
    "Roland Banks deck only.\nUses(4 ammo).\nSpend 1 ammo: Fight.You get +1 COMBAT for this attack(if there are 1 or more clues on your location, you get + 3 COMBAT, instead).This attack deals + 1 damage.";
}
