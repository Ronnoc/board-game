import { OriginalCorporation } from "./cards/corporation/OriginalCorporation";
import { PreludeCorporation } from "./cards/prelude/PreludeCorporation";
import { VenusCorporation } from "./cards/venusNext/VenusCorporation";
import { ColoniesCorporation } from "./cards/colonies/ColoniesCorporation";
import { TurmoilCorporation } from "./cards/turmoil/TurmoilCorporation";
import { PromoCorporation } from "./cards/promo/PromoCorporation";

export const CorporationName =  { ...OriginalCorporation, ...PreludeCorporation, ...VenusCorporation, ...ColoniesCorporation, ...TurmoilCorporation, ...PromoCorporation }
export type CorporationName = typeof OriginalCorporation | PreludeCorporation | VenusCorporation | ColoniesCorporation | TurmoilCorporation | PromoCorporation | string;
export enum CorporationGroup {
  ORIGINAL = "Original",
  PRELUDE = "Prelude",
  VENUS_NEXT = "Venus Next",
  COLONIES = "Colonies",
  TURMOIL = "Turmoil",
  PROMO = "Promo",
  FANMADE = "FanMade",
}

