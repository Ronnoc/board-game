import { ChaosToken } from "./enums/ChaosToken";

export class ChaosBag {
  constructor(public tokens: Array<ChaosToken>) {
    this.tokens = tokens;
  }
}
