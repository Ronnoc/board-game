import { PlayerInput } from "./PlayerInput";
import { PlayerInputTypes } from "../enums/PlayerInputTypes";
// import { SelectCardInput } from "./SelectCardInput";

export class SelectInput implements PlayerInput {
  public inputType: PlayerInputTypes = PlayerInputTypes.SELECT_OPTION;

  constructor(public title: string, public cb: () => SelectInput | undefined) {
    this.title = title;
    this.cb = cb;
  }
}
