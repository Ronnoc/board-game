import Vue from "vue";

export const Board = Vue.component("player-home", {
  props: ["player", "game"],
  components: {
    // Network,
  },
  template: `
        <div class="start-screen">
            <h1 class="start-screen-game-title" >Arkham Horror LCG</h1>
        </div>
    `,
});
