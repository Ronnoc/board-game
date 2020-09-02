import { PlayerInput } from "./PlayerInput";
import { PlayerInputTypes } from "../enums/PlayerInputTypes";

export class SelectCard<T> implements PlayerInput {
    public inputType: PlayerInputTypes = PlayerInputTypes.SELECT_CARD;

    constructor(
        public title: string,
        public cards: Array<T>,
        public cb: (cards: Array<T>) => PlayerInput | undefined,
        public minCardsToSelect: number = 1,
        public maxCardsToSelect: number = 1,
        public buttonLabel: string = "Save",
    ) {
      this.buttonLabel = buttonLabel;
    }
}
