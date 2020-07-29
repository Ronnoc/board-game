import { ILoadable, SerializedGame } from "./Serialized";

export default class Game implements ILoadable<SerializedGame, Game> {
  public loadFromJSON(d: SerializedGame): Game {
    let o = Object.assign(this, d);
    return o;
  }
}
