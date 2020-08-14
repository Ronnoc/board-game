import { PlayerInput } from "../inputs/PlayerInput";
import { LogMessage } from "../LogMessage";

export interface IFPlayerGameState {
  id: string,
  gameid: string,
  waitingfor: PlayerInput,
  gameLog: LogMessage[],
}
