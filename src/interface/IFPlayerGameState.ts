import { PlayerInput } from "../inputs/PlayerInput";
import { LogMessage } from "../LogMessage";
import { IInvestigatorCard } from "../cards/IInvestigatorCard";
import { IPlayerCard } from "../cards/IPlayerCard";
import { IEncounterCard } from "../cards/IEncounterCard";
import { Player } from "../Player";
import { ILocationCard } from "../cards/ILocationCard";
import { IActCard } from "../cards/IActCard";
import { IAgendaCard } from "../cards/IAgendaCard";
import { IScenario } from "../cards/IScenario";
import { Phase } from "../enums/Phase";
import { ChaosBag } from "../ChaosBag";

export interface IFPlayerGameState {
  // player
  id: string,
  investigator: IInvestigatorCard,
  atLocation: ILocationCard,
  cardsInHand: Array<IPlayerCard | IEncounterCard>;
  cardsDiscarded: Array<IPlayerCard | IEncounterCard>;
  assets: Array<IPlayerCard>,
  threats: Array<IPlayerCard | IEncounterCard>,
  waitingFor: PlayerInput,
  // game
  gameId: string,
  phase: Phase,
  gameLog: LogMessage[],
  players: Player[],
  locations: ILocationCard[],
  npcs: Array<IPlayerCard | IEncounterCard>,
  act: IActCard,
  agenda: IAgendaCard,
  scenario: IScenario,
  chaosBag: ChaosBag,
  gameAge: number,
}
