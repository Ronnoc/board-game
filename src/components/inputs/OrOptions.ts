import Vue, { VNode } from "vue";
import { PlayerInputFactory } from "./PlayerInputFactory";

const unique = 0;

export const OrOptions = Vue.component("or-options", {
  props: ["player", "players", "playerinput", "onsave", "showsave", "showtitle"],
  data() {
    return {
      selectedOption: 0,
    };
  },
  methods: {
    saveData() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { componentInstance } = this.$data.childComponents[this.$data.selectedOption] as any;
      if (componentInstance !== undefined) {
        if (componentInstance.saveData instanceof Function) {
          componentInstance.saveData();
          return;
        }
      }
      throw new Error("Unexpected unable to save data");
    },
  },
  render(createElement) {
    this.$data.childComponents = [];
    const children: Array<VNode> = [];
    if (this.showtitle) {
      children.push(createElement("label", [createElement("div", this.playerinput.title)]));
    }
    const optionElements: Array<VNode> = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.playerinput.options.forEach((option: any, idx: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const domProps: { [key: string]: any } = {
        name: `selectOption${unique}`,
        type: "radio",
        value: String(idx),
      };
      const displayStyle: string = this.$data.selectedOption === idx ? "block" : "none";
      const subchildren: Array<VNode> = [];
      if (this.$data.selectedOption === idx) {
        domProps.checked = true;
      }
      subchildren.push(createElement("label", { class: "form-radio" }, [
        createElement("input", {
          domProps,
          on: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            change: (event: any) => {
              this.selectedOption = Number(event.target.value);
            },
          },
        }),
        createElement("i", { class: "form-icon" }),
        createElement("span", option.title),
      ]));
      this.$data.childComponents.push(
        new PlayerInputFactory().getPlayerInput(
          createElement, this.players, this.player, option, (out: Array<Array<string>>) => {
            const copy = out[0].slice();
            copy.unshift(String(idx));
            this.onsave([copy]);
          }, false, false,
        ),
      );
      subchildren.push(createElement("div", { style: { display: displayStyle, marginLeft: "30px" } }, [this.$data.childComponents[this.$data.childComponents.length - 1]]));
      optionElements.push(subchildren[subchildren.length - 1]);
      children.push(createElement("div", subchildren));
      if (this.showsave && this.$data.selectedOption === idx) {
        children.push(createElement("div", { style: { margin: "5px 30px 10px" }, class: "wf-action" }, [createElement("button", { domProps: { className: "btn btn-primary" }, on: { click: () => { this.saveData(); } } }, "Save")]));
      }
    });
    return createElement("div", { class: "wf-options" }, children);
  },
});
