import Vue from "vue";
import { StartScreen } from "./StartScreen";
import { PlayerHome } from "./PlayerHome";
import { CreateGameForm } from "./CreateGameForm";
import { GameHome } from "./GameHome";
import { IFGameInfo } from "../interface/IFGameInfo";
import { IFPlayerGameState } from "../interface/IFPlayerGameState";
import { Phase } from "../enums/Phase";

export const vm = new Vue({
  el: "#app",
  data: {
    screen: "empty",
    game: {} as IFGameInfo,
    player: {} as IFPlayerGameState,
  },
  components: {
    "vm-start-screen": StartScreen,
    "vm-player-home": PlayerHome,
    "vm-game-home": GameHome,
    "vm-create-game-form": CreateGameForm,
  },
  methods: {
    updatePlayer() {
      const currentPathname: string = window.location.pathname;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `/api/player_state${window.location.search.replace("&noredirect", "")}`);
      xhr.onerror = function onError() {
        alert("Error getting game data");
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.player = xhr.response;
          if (this.player.phase === Phase.END && window.location.search.indexOf("&noredirect") === -1) {
            this.screen = "vm-the-end";
            if (currentPathname !== "/the-end") {
              window.history.replaceState(xhr.response, "Teraforming Mars - Player", `/the-end?id=${xhr.response.id}`);
            }
          } else {
            this.screen = "vm-player-home";
            if (currentPathname !== "/player") {
              window.history.replaceState(xhr.response, "Teraforming Mars - Game", `/player?id=${xhr.response.id}`);
            }
          }
        } else {
          alert("Unexpected server response");
        }
      };
      xhr.responseType = "json";
      xhr.send();
    },
  },
  mounted(): void {
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
          window.history.replaceState(
            xhr.response,
            "Arkham Horror LCG - Game",
            `/game?id=${xhr.response.id}`,
          );
          this.game = xhr.response as IFGameInfo;
        } else {
          alert(`Unexpected server response ${xhr.status}`);
        }
      };
      xhr.responseType = "json";
      xhr.send();
    } else if (currentPathname === "/player") {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `/api/player_state${window.location.search.replace("&noredirect", "")}`,
      );
      xhr.onerror = () => {
        alert("Error getting game data");
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.player = xhr.response as IFPlayerGameState;
          this.screen = "vm-player-home";
          if (currentPathname !== "/player") {
            window.history.replaceState(
              xhr.response,
              "Arkham Horror LCG - Game",
              `/player?id=${xhr.response.id}`,
            );
          }
        } else {
          alert("Unexpected server response");
        }
      };
      xhr.responseType = "json";
      xhr.send();
    }
  },
});
