import { ChaosToken } from "./enums/ChaosToken";
import { shuffle } from "./utils";

export class ChaosBag {
  constructor(public tokens: Array<ChaosToken>) {
    this.tokens = shuffle(tokens);
  }

  private draw():ICard {
    const rtn = this.tokens.shift();
    if (rtn === undefined) {
      throw new Error("Unexpected empty ChaosBag");
    }
    return rtn;
  }

  public shuffleDeck():void{
    this.tokens = shuffle(this.tokens);
  }

  public putInDeck(token: ChaosToken):void{
    this.tokens.push(token);
    this.shuffleDeck();
  }

  public drawToken(skipFunc?: (Token:ChaosToken) => boolean):ChaosToken {
    let result = this.draw();
    if (skipFunc !== undefined) {
      const skipTokens = [];
      while (skipFunc(result)) {
        skipTokens.push(result);
        result = this.drawToken();
      }
      skipTokens.forEach((Token) => this.putInDeck(Token));
      if (skipTokens.length > 0) this.shuffleDeck();
    }
    return result;
  }
}
