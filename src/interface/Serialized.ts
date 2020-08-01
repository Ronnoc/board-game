export interface ILoadable<T, T2> {
  loadFromJSON(d: T): T2;
}

export interface SerializedGame {
  id: string;
}

export interface SerializedPlayer {
  id: string;
}
