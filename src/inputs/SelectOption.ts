import { PlayerInput } from "./PlayerInput";
import { PlayerInputTypes } from "../enums/PlayerInputTypes";
// import { AndOptions } from './AndOptions';
// import { SelectAmount } from "./SelectAmount";
// import { SelectCard } from "./SelectCard";
// import { IFCard } from "../cards/IFCard";

export class SelectOption implements PlayerInput {
  public inputType: PlayerInputTypes = PlayerInputTypes.SELECT_OPTION;

  constructor(public title: string, public cb: () => SelectOption | undefined) {
    this.title = title;
    this.cb = cb;
  }
}
