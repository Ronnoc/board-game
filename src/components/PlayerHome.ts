import Vue from "vue";
import { Board } from "./Board";

export const PlayerHome = Vue.component("player-home", {
  props: ["player"],
  components: {
    "vm-board": Board,
  },
  template: `
        <div>
            <h1>Arkham Horror LCG Player Home</h1>
            <vm-board></vm-board>
        </div>
    `,
});
