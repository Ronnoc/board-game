import Vue from "vue";

import { Card } from "../Card";
import { ICard } from "../../cards/ICard";

interface SelectCardModel {
    cards: Array<ICard>;
}

export const SelectCardOption = Vue.component("select-card", {
  props: ["playerinput", "onsave", "showsave", "showtitle"],
  data() {
    return {
      cards: [],
    } as SelectCardModel;
  },
  components: {
    "vm-card": Card,
  },
  methods: {
    saveData() {
      this.onsave(
        [Array.isArray(this.$data.cards) ? this.$data.cards.map(
          (card:ICard) => card.runtimeId,
        ) : [this.$data.cards.runtimeId]],
      );
    },
  },
  template: `<div class="wf-component wf-component--select-card">
        <div v-if="showtitle === true" class="nofloat wf-component-title" v-i18n>{{playerinput.title}}</div>
        <table><tbody><tr>
          <td v-for="card in playerinput.cards">
          <label :card="card" class="cardbox">
              <input v-if="playerinput.maxCardsToSelect === 1 && playerinput.minCardsToSelect === 1" type="radio" v-model="cards" :value="card" />
              <input v-else type="checkbox" v-model="cards" :value="card" :disabled="cards.length >= playerinput.maxCardsToSelect && cards.indexOf(card) === -1" />
              <vm-card :card="card"></vm-card>
          </label>
          </td>
        </tr></tbody></table>
        
        <div v-if="showsave === true" class="nofloat">
            <button class="btn btn-primary" v-on:click="saveData">{{playerinput.buttonLabel}}</button>
        </div>
    </div>`,
});
