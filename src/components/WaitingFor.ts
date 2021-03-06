import Vue from "vue";
import { OrOptions } from "./inputs/OrOptions";
import { SelectOption } from "./inputs/SelectOption";
import { PlayerInputFactory } from "./inputs/PlayerInputFactory";
import { SelectCardOption } from "./inputs/SelectCardOption";

let uiUpdateTimeout: number | undefined;

export const WaitingFor = Vue.component("waiting-for", {
  props: ["player", "players", "waitingFor"],
  components: {
    "or-options": OrOptions,
    "select-option": SelectOption,
    "select-card": SelectCardOption,
  },
  methods: {
    waitForUpdate() {
      clearTimeout(uiUpdateTimeout);
      const askForUpdate = () => {
        const xhr = new XMLHttpRequest();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const root = (this).$root as any;
        xhr.open("GET", `/api/waiting_for${window.location.search}&prev-game-age=${this.player.gameAge.toString()}`);
        xhr.onerror = function onError() {
          alert("Error getting waitingFor data");
        };
        xhr.onload = () => {
          if (xhr.status === 200) {
            const result = xhr.response;
            if (result.result === "GO") {
              root.updatePlayer();

              // if (Notification.permission !== "granted") {
              //   Notification.requestPermission();
              // }
              // if (Notification.permission === "granted") {
              //   const notify = new Notification(
              //     "Terraforming Mars Online",
              //     {
              //       icon: "/favicon.ico",
              //       body: "It's your turn!",
              //     },
              //   );
              //   notify.close();
              // }
              // We don't need to wait anymore - it's our turn
              return;
            } if (result.result === "REFRESH") {
              // Something changed, let's refresh UI
              root.updatePlayer();
              return;
            }
            (this).waitForUpdate();
          } else {
            alert(`@WaitingFor.waitForUpdate Unexpected server response status=${xhr.status}`);
          }
        };
        xhr.responseType = "json";
        xhr.send();
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uiUpdateTimeout = setTimeout(askForUpdate, 2000) as any;
    },
  },
  render(createElement) {
    if (this.waitingFor === undefined) {
      this.waitForUpdate();
      return createElement("div", "Not your turn to take any actions");
    }
    const input = new PlayerInputFactory().getPlayerInput(
      createElement, this.players, this.player, this.waitingFor, (out: Array<Array<string>>) => {
        const xhr = new XMLHttpRequest();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        xhr.open("POST", `/api/player_input?id=${(this.$parent as any).player.id}`);
        xhr.responseType = "json";
        xhr.onload = () => {
          if (xhr.status === 200) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const root = (this.$root as any);
            root.player = xhr.response;
            root.screen = "vm-player-home";
          } else if (xhr.status === 400 && xhr.responseType === "json") {
            const element: HTMLElement | null = document.getElementById("dialog-default");
            const message: HTMLElement | null = document.getElementById("dialog-default-message");
            if (message !== null
              && element !== null
              && (element as HTMLDialogElement).showModal !== undefined) {
              message.innerHTML = xhr.response.message;
              (element as HTMLDialogElement).showModal();
            } else {
              alert(xhr.response.message);
            }
          } else {
            alert("Error sending input");
          }
        };
        xhr.onerror = function onError() {
          console.log("Error sending waitingFor input data");
        };
        xhr.send(JSON.stringify(out));
      }, true, true,
    );

    return createElement("div", { class: "wf-root" }, [input]);
  },
});
