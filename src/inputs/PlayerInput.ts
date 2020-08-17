import { PlayerInputTypes } from "../enums/PlayerInputTypes";

export interface PlayerInput {
  inputType: PlayerInputTypes;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (...item: any) => PlayerInput | undefined;
}
