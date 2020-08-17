import { RolandBanks } from "./investigators/RolandBanks";
import { Roland38Special } from "./investigators/Roland38Special";
import { Study } from "./TheGathering/Study";
import { TheGathering } from "./TheGathering/TheGathering";
import { Trapped } from "./TheGathering/Trapped";
import { WhatsGoingOn } from "./TheGathering/WhatsGoingOn";
import { ICard } from "../ICard";

export const CoreCards: Array<typeof ICard> = [
  RolandBanks,
  Roland38Special,
  Study,
  TheGathering,
  Trapped,
  WhatsGoingOn,
];
