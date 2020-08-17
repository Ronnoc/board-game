import { CardKeyword } from "../../../enums/CardKeyword";
import { CardTrait } from "../../../enums/CardTrait";
import { EncounterSet } from "../../../enums/EncounterSet";
import { IEnemyCard } from "../../IEnemyCard";

export class SwarmOfRats extends IEnemyCard {
  static cArkhamDBID = "01159"

  mSetName = EncounterSet.CORE_RATS;

  mName = "Swarm of Rats"

  mTraits = [CardTrait.CREATURE]

  mFight = 1

  mHealth = 1

  mEvade = 3

  mDamage = 1

  mHorror = 0

  mKeywords = [CardKeyword.HUNTER]
}
