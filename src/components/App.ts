import Vue from "vue";
import { StartScreen } from "./StartScreen";
import { Board } from "./Board";

export const vm = new Vue({
  el: "#app",
  data: {
    screen: "empty",
  },
  components: {
    "vm-start-screen": StartScreen,
    "vm-board": Board,
  },
  mounted():void {
    this.screen = "vm-board";
  },
});
