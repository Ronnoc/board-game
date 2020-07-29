import { ILoadable, SerializedGame } from "./Serialized";

export class Game implements ILoadable<SerializedGame, Game> {
  public loadFromJSON(d: SerializedGame): Game {
    return Object.assign(this, d);
  }
}
