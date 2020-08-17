import { PlayerInput } from "../inputs/PlayerInput";
import { LogMessage } from "../LogMessage";
import { IInvestigatorCard } from "../cards/IInvestigatorCard";
import { IPlayerCard } from "../cards/IPlayerCard";
import { ITreacheryCard } from "../cards/ITreacheryCard";
import { Player } from "../Player";
import { ILocationCard } from "../cards/ILocationCard";
import { IActCard } from "../cards/IActCard";
import { IAgendaCard } from "../cards/IAgendaCard";
import { IScenario } from "../cards/IScenario";
import { Phase } from "../enums/Phase";
import { ChaosBag } from "../ChaosBag";
import { EncounterDealer } from "../EncounterDealer";

export interface IFPlayerGameState {
  // player
  id: string,
  investigator: IInvestigatorCard,
  atLocation: ILocationCard,
  cardsInHand: Array<IPlayerCard | ITreacheryCard>;
  cardsDiscarded: Array<IPlayerCard | ITreacheryCard>;
  assets: Array<IPlayerCard>,
  threats: Array<IPlayerCard | ITreacheryCard>,
  waitingFor: PlayerInput,
  // game
  gameId: string,
  phase: Phase,
  gameLog: LogMessage[],
  players: Player[],
  locations: ILocationCard[],
  npcs: Array<IPlayerCard | ITreacheryCard>,
  act: IActCard,
  agenda: IAgendaCard,
  scenario: IScenario,
  chaosBag: ChaosBag,
  encounterDealer: EncounterDealer,
}
