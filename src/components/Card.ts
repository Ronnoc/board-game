import Vue from "vue";
import { ILocationCard } from "../cards/ILocationCard";

const Localhtml = (card: ILocationCard): string => {
  let rtn = "";
  rtn += "<div>";
  rtn += `<h5>${card.mName}</h5>`;
  if (card.isFront) {
    rtn += `<a>Shroud:${card.mShroud}</a>`;
    rtn += `<a>mClues:${card.mClues}</a>`;
    rtn += `<a>mCluePerInvestigator:${card.mCluePerInvestigator}</a>`;
    rtn += `<a>${card.mFrontText}</a>`;
  } else {
    rtn += `<a>${card.mBackText}</a>`;
  }
  rtn += "</div>";
  return rtn;
};

export const Card = Vue.component("card", {
  props: [
    "card",
  ],
  methods: {
    getCardContent() {
      return Localhtml(this.card);
    },
  },
  template: `
  <div class=general_card>
    <div class="card_resources_counter" v-if="card.resources !== undefined">
      {{ card.mResourceName }}:
      <span class="card_resources_counter--number"> 
      {{ card.mResource }}
      </span>
    </div>
    <div class="card-content-wrapper">
      <div LocationCard>
    </div>
  </div>
  `,
});
