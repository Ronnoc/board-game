import { RolandBanks } from "./investigators/RolandBanks";
import { Roland38Special } from "./investigators/Roland38Special";
import { Study } from "./TheGathering/Study";
import { TheGathering } from "./TheGathering/TheGathering";
import { Trapped } from "./TheGathering/Trapped";
import { WhatsGoingOn } from "./TheGathering/WhatsGoingOn";
import { ICard } from "../ICard";
import { CoverUp } from "./investigators/CoverUp";
import { Paranoia } from "./weakness/Paranoia";
import { SwarmOfRats } from "./encounter/SwarmOfRats";

export const CoreCards: Array<typeof ICard> = [
  SwarmOfRats,

  RolandBanks,
  Roland38Special,
  CoverUp,

  Study,

  TheGathering,
  Trapped,
  WhatsGoingOn,

  Paranoia,
];
