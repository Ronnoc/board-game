import { IActCard } from "./IActCard";
import { IAgendaCard } from "./IAgendaCard";

export interface IScenario {
  name: string;
  acts: Array<IActCard>;
  agendas: Array<IAgendaCard>;
  arkhamdbid?: number;
}
