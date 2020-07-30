import { StartScreen } from "./StartScreen";

export const mainAppSettings = {
  el: "#app",
  data: {
    screen: "empty",
  },
  components: {
    "start-screen": StartScreen,
  },
  mounted():void {
    console.log("mounted!");
    ((this as unknown) as Record<string, string>).screen = "start-screen";
  },
};
