import Vue from "vue";
import { ILocationCard } from "../cards/ILocationCard";

const Localhtml = (card: ILocationCard): string => {
  let rtn = "";
  rtn += "<div>";
  rtn += `<h5>${card.mName}</h5>`;
  if (card.isFront) {
    rtn += `<a>Shroud: ${card.mShroud}</a><br>`;
    rtn += `<a>Clues: ${card.mClues}</a>`;
    if (card.mCluePerInvestigator) {
      rtn += "<a>xP</a>";
    }
    rtn += "<br>";
    rtn += `<p>${card.mFrontText}</p>`;
  } else {
    rtn += `<p>${card.mBackText}</p>`;
  }
  rtn += "</div>";
  return rtn;
};

export const Card = Vue.component("card", {
  props: ["card"],
  computed: {
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
    <p class="card-content-wrapper" v-html=getCardContent>
    </p>
  </div>
  `,
});
