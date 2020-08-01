import Vue from "vue";
import { StartScreen } from "./StartScreen";

export const vm = new Vue({
  el: "#app",
  data: {
    screen: "empty",
  },
  components: {
    "start-screen": StartScreen,
  },
  mounted():void {
    this.screen = "start-screen";
  },
});
