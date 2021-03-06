import { PlayerInput } from "../inputs/PlayerInput";
import { LogMessage } from "../LogMessage";
import { IInvestigatorCard } from "../cards/IInvestigatorCard";
import { Player } from "../Player";
import { ILocationCard } from "../cards/ILocationCard";
import { IActCard } from "../cards/IActCard";
import { IAgendaCard } from "../cards/IAgendaCard";
import { IScenario } from "../cards/IScenario";
import { Phase } from "../enums/Phase";
import { ChaosBag } from "../ChaosBag";
import { ICard } from "../cards/ICard";

export interface IFPlayerGameState {
  // player
  id: string,
  investigator: IInvestigatorCard,
  atLocation: ILocationCard,
  cardsInHand: Array<ICard>;
  cardsDiscarded: Array<ICard>;
  assets: Array<ICard>,
  threats: Array<ICard>,
  waitingFor: PlayerInput,
  // game
  gameId: string,
  phase: Phase,
  gameLog: LogMessage[],
  players: Player[],
  locations: ILocationCard[],
  npcs: Array<ICard>,
  act: IActCard,
  agenda: IAgendaCard,
  scenario: IScenario,
  chaosBag: ChaosBag,
  gameAge: number,
}
