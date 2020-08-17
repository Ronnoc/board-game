import { RolandBanks } from "./investigators/RolandBanks";
import { Roland38Special } from "./investigators/Roland38Special";
import { Study } from "./TheGathering/Study";
import { TheGathering } from "./TheGathering/TheGathering";
import { Trapped } from "./TheGathering/Trapped";
import { WhatsGoingOn } from "./TheGathering/WhatsGoingOn";
import { IFCard } from "../IFCard";

export const CoreCards: Array<() => IFCard> = [
  (): IFCard => new RolandBanks(),
  (): IFCard => new Roland38Special(),
  (): IFCard => new Study(),
  (): IFCard => new TheGathering(),
  (): IFCard => new Trapped(),
  (): IFCard => new WhatsGoingOn(),
];
