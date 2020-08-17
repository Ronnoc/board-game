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
      <div>
        *Scenario+Act+Agenda
        <table><tbody><tr>
          <td><vm-card :card="player.scenario"></vm-card></td>
          <td><vm-card :card="player.act"></vm-card></td>
          <td><vm-card :card="player.agenda"></vm-card></td>
        </tr></tbody></table>
      </div>
      <div>
        *locations
        <table v-if="player.locations.length > 0"><tbody><tr>
          <td v-for="loc in player.locations" :card="loc">
            <vm-card :card="loc"></vm-card>
          </td>
        </tr></tbody></table>
      </div>
      <div>
        *npcs
        <table v-if="player.npcs.length > 0"><tbody><tr>
          <td v-for="npc in player.npcs" :card="npc">
            <vm-card :card="npc"></vm-card>
          </td>
        </tr></tbody></table>
      </div>
      <div>
        *threats
        <table v-if="player.npcs.threats > 0"><tbody><tr>
          <td v-for="thr in player.threats" :card="thr">
            <vm-card :card="thr"></vm-card>
          </td>
        </tr></tbody></table>
      </div>
      <div>
        *investigator+assets
        <table><tbody><tr>
          <td><vm-card :card="player.investigator"></vm-card></td>
          <td v-for="ass in player.assets" :card="ass">
            <vm-card :card="ass"></vm-card>
          </td>
        </tr></tbody></table>
      </div>
      <div>
        *cardsInHand
        <table v-if="player.cardsInHand.threats > 0"><tbody><tr>
          <td v-for="crd in player.cardsInHand" :card="crd">
            <vm-card :card="crd"></vm-card>
          </td>
        </tr></tbody></table>
      </div>
      <div>
        *log-panel
        <vm-log-panel
          :messages="player.gameLog"
          :players="player.players">
        </vm-log-panel>
      </div>
      <div>
        *waiting-for
        <vm-waiting-for
          :player="player"
          :waitingFor="player.waitingFor">
        </vm-waiting-for>
      </div>
    </div>
    `,
});
