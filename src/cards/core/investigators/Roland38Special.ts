import { IPlayerCard } from "../../IPlayerCard";
import { CardFaction } from "../../../enums/CardFaction";
import { CardTrait } from "../../../enums/CardTrait";
import { SkillIcon } from "../../../enums/SkillIcon";
import { PlayerCardType } from "../../../enums/PlayerCardType";

export class Roland38Special extends IPlayerCard {
  mName = "Roland38Special";

  mCost = 3;

  mXP = 0;

  mFaction = CardFaction.GUARDIAN;

  mType = PlayerCardType.ASSET;

  mTraits = [CardTrait.ITEM, CardTrait.WEAPON, CardTrait.FIREARM];

  mTestIcons = [SkillIcon.COMBAT, SkillIcon.AGILITY, SkillIcon.WILD];

  mText =
    "Roland Banks deck only.\nUses(4 ammo).\nSpend 1 ammo: Fight.You get +1 COMBAT for this attack(if there are 1 or more clues on your location, you get + 3 COMBAT, instead).This attack deals + 1 damage.";
}
