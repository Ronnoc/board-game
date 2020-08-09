import Vue from "vue";

export const GameHome = Vue.component("game-home", {
  props: ["game"],
  template: `
        <div>
            <h1 >Arkham Horror LCG Game Home</h1>
            <li v-for="player in game.players">
                <span>
                    <a :href="'/player?id=' + player.id">{{ player.name }}</a>
                </span>
            </li>
        </div>
    `,
});
