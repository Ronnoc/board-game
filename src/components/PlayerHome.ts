import Vue from "vue";
import { Board } from "./Board";
import { WaitingFor } from "./WaitingFor";
import { LogPanel } from "./LogPanel";
import { Card } from "./Card";

export const PlayerHome = Vue.component("player-home", {
  props: ["player"],
  components: {
    "vm-board": Board,
    "vm-waiting-for": WaitingFor,
    "vm-log-panel": LogPanel,
    "vm-card": Card,
  },
  template: `
        <div>
            <h1>Arkham Horror LCG Player Home</h1>
            <vm-log-panel 
              :messages="player.gameLog" 
              :players="player.players">
            </vm-log-panel>
            <div>
              <vm-card v-for="loc in player.locations"
                v-bind:card="loc">
              </vm-card>
            </div>
            <vm-waiting-for
              :player="player"
              :waitingfor="player.waitingfor"
            ></vm-waiting-for>
        </div>
    `,
});
