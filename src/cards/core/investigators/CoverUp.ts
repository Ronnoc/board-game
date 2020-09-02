import { CardFaction } from "../../../enums/CardFaction";
import { WeaknessType } from "../../../enums/WeaknessType";
import { ITreacheryCard } from "../../ITreacheryCard";

export class CoverUp extends ITreacheryCard {
  mName = "Cover Up";

  mFaction = CardFaction.NEUTRAL;

  mWeaknessType = WeaknessType.WEAKNESS;
}
