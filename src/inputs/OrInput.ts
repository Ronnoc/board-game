import { PlayerInput } from "./PlayerInput";
import { PlayerInputTypes } from "../enums/PlayerInputTypes";
import { SelectInput } from "./SelectInput";

export class OrInput implements PlayerInput {
  public cb(): undefined {
    return undefined;
  }

  public title = "Select one option";

  public options: Array<PlayerInput>;

  public inputType: PlayerInputTypes = PlayerInputTypes.OR_OPTIONS;

  constructor(
    ...options: Array<SelectInput>
  ) {
    this.options = options;
  }
}
