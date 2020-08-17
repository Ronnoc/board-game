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

export interface IFPlayerGameState {
  id: string,
  gameId: string,
  investigator: IInvestigatorCard,
  cardsInHand: Array<IPlayerCard|ITreacheryCard>;
  assets: Array<IPlayerCard>,
  threats: Array<IPlayerCard|ITreacheryCard>,
  waitingFor: PlayerInput,
  gameLog: LogMessage[],
  players: Player[],
  locations: ILocationCard[],
  npcs: Array<IPlayerCard|ITreacheryCard>,
  act: IActCard,
  agenda: IAgendaCard,
  scenario:IScenario,
}
