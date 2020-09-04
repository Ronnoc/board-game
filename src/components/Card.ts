import Vue from "vue";
import { ILocationCard } from "../cards/ILocationCard";
import { CardType } from "../enums/CardType";
import { ICard } from "../cards/ICard";
import { IInvestigatorCard } from "../cards/IInvestigatorCard";

const LocationCardHtml = (card: ILocationCard): string => {
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

const InvestigatorCardHtml = (card: IInvestigatorCard): string => {
  let rtn = "";
  rtn += "<div>";
  rtn += `<h5>${card.mName}</h5>`;
  rtn += `<p>W${card.mWillpower} I${card.mIntellect} C${card.mCombat} A${card.mAgility}</p>`;
  rtn += `<a>H ${card.curHealth}/${card.mHealth}</a><br>`;
  rtn += `<a>S ${card.curSanity}/${card.mSanity}</a><br>`;
  rtn += `<a>R ${card.curResource}</a><br>`;
  rtn += "</div>";
  return rtn;
};

export const Card = Vue.component("card", {
  props: ["card"],
  computed: {
    getCardContent() {
      if (this.card === undefined) return "card is undefined";
      if ((this.card as ICard).mCardType === CardType.LOCATION) {
        return LocationCardHtml(this.card);
      }
      if ((this.card as ICard).mCardType === CardType.INVESTIGATOR) {
        return InvestigatorCardHtml(this.card);
      }
      return JSON.stringify(this.card, null, 2);
    },
  },
  template: `
  <div class=general_card>
    <p class="card-content-wrapper" v-html=getCardContent></p>
  </div>
  `,
});
