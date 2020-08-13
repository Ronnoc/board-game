import { PlayerInput } from "./PlayerInput";
import { PlayerInputTypes } from "../enums/PlayerInputTypes";
import { SelectOption } from "./SelectOption";

export class OrOptions implements PlayerInput {
  public cb(): undefined {
    return undefined;
  }

  public title = "Select one option";

  public options: Array<PlayerInput>;

  public inputType: PlayerInputTypes = PlayerInputTypes.OR_OPTIONS;

  constructor(
    ...options: Array<SelectOption>
  ) {
    this.options = options;
  }
}
