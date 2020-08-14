import Vue from "vue";
import { Board } from "./Board";
import { WaitingFor } from "./WaitingFor";
import { LogPanel } from "./LogPanel";

export const PlayerHome = Vue.component("player-home", {
  props: ["player"],
  components: {
    "vm-board": Board,
    "vm-waiting-for": WaitingFor,
    "vm-log-panel": LogPanel,
    // "vm-card": Card,
  },
  template: `
        <div>
            <h1>Arkham Horror LCG Player Home</h1>
            <vm-board></vm-board>
            <vm-log-panel 
              :messages="player.gameLog" 
              :players="player.players">
            </vm-log-panel>
            <vm-waiting-for
              :player="player"
              :waitingfor="player.waitingfor"
            ></vm-waiting-for>
        </div>
    `,
});
