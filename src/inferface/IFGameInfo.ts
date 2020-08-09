import { IFPlayerInfo } from "./IFPlayerInfo";

export interface IFGameInfo {
  id: string;
  players: Array<IFPlayerInfo>;
}
