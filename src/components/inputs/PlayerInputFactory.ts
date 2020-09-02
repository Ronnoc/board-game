import Vue, { VNode } from "vue";
import { PlayerInputTypes } from "../../enums/PlayerInputTypes";
import { IFPlayerGameState } from "../../interface/IFPlayerGameState";
import { IFPlayerInput } from "../../interface/IFPlayerInput";

export class PlayerInputFactory {
  private getComponentName(inputType: PlayerInputTypes): string {
    switch (inputType) {
      // case PlayerInputTypes.AND_OPTIONS:
      //   return "and-options";
      case PlayerInputTypes.SELECT_CARD:
        return "select-card";
      case PlayerInputTypes.OR_OPTIONS:
        return "or-options";
      case PlayerInputTypes.SELECT_OPTION:
        return "select-option";
      // case PlayerInputTypes.SELECT_PLAYER:
      //   return "select-player";
      default:
        throw new Error("Unsupported input type");
    }
  }

  public getPlayerInput(
    createElement: typeof Vue.prototype.$createElement,
    players: Array<IFPlayerGameState>,
    player: IFPlayerGameState,
    playerinput: IFPlayerInput,
    onsave: (out: Array<Array<string>>) => void,
    showsave: boolean,
    showtitle: boolean,
  ): VNode {
    return createElement(this.getComponentName(playerinput.inputType), {
      attrs: {
        player, players, playerinput, showsave, showtitle, onsave,
      },
    });
  }
}
