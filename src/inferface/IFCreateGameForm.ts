import { DifficultyLevel } from "../enums/DifficultyLevel";
import { IFCreatePlayer } from "./IFCreatePlayer";

export interface IFCreateGameForm{
  players: Array<IFCreatePlayer>,
  difficultyLevel: DifficultyLevel,
}
