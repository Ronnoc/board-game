import Vue from "vue";
import { StartScreen } from "./StartScreen";
import { PlayerHome } from "./PlayerHome";
import { CreateGameForm } from "./CreateGameForm";
import { GameHome } from "./GameHome";
import { IFGameInfo } from "../inferface/IFGameInfo";

export const vm = new Vue({
  el: "#app",
  data: {
    screen: "empty",
    game: {} as IFGameInfo,
  },
  components: {
    "vm-start-screen": StartScreen,
    "vm-player-home": PlayerHome,
    "vm-game-home": GameHome,
    "vm-create-game-form": CreateGameForm,
  },
  mounted():void {
    const currentPathname: string = window.location.pathname;
    this.screen = "vm-start-screen";
    if (currentPathname === "/new_game") {
      this.screen = "vm-create-game-form";
    } else if (currentPathname === "/game") {
      this.screen = "vm-game-home";
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `/api/game${window.location.search}`);
      xhr.onerror = () => {
        alert("Error getting game data");
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          window.history.replaceState(xhr.response, "Arkham Horror LCG - Game", `/game?id=${xhr.response.id}`);
          this.game = xhr.response as IFGameInfo;
        } else {
          alert(`Unexpected server response ${xhr.status}`);
        }
      };
      xhr.responseType = "json";
      xhr.send();
    } else if (currentPathname === "/player") {
      this.screen = "vm-player-home";
    }
  },
});
