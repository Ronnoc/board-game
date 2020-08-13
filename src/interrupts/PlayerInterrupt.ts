import { Player } from "../Player";
import { PlayerInput } from "../inputs/PlayerInput";

export interface PlayerInterrupt {
  player: Player,
  playerInput: PlayerInput,
  beforeAction?(): void
}
