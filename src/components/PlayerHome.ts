import Vue from "vue";
import { Board } from "./Board";

export const PlayerHome = Vue.component("player-home", {
  props: ["player_state"],
  components: {
    "vm-board": Board,
    // "vm-log-panel": LogPanel,
    // "vm-waiting-for": WaitingFor,
    // "vm-card": Card,
  },
  template: `
        <div>
            <h1>Arkham Horror LCG Player Home</h1>
            <vm-board></vm-board>
        </div>
    `,
});
