import { PlayerInputTypes } from "../enums/PlayerInputTypes";

export interface PlayerInput {
  inputType: PlayerInputTypes;
  title: string;
  cb: (...item: any) => PlayerInput | undefined;
}
