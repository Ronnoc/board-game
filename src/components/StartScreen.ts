import Vue from "vue";
// import {LanguageSwitcher} from "./LanguageSwitcher";

export const StartScreen = Vue.component("start-screen", {
  template: `
        <div class="start-screen">
            <h1 class="start-screen-game-title" >Arkham Horror LCG</h1>

            <div class="start-screen-links">
                <a class="start-screen-link start-screen-link--new-game" href="/new-game">New game</a>
            </div>
        </div>
    `,
});
