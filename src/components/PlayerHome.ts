import Vue from "vue";
import { Board } from "./Board";

export const PlayerHome = Vue.component("player-home", {
  props: ["player"],
  components: {
    board: Board,
  },
  template: `
        <div class="start-screen">
            <h1 class="start-screen-game-title" >Arkham Horror LCG</h1>
        </div>
    `,
});
