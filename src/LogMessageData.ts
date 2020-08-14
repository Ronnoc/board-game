import { LogMessageDataType } from "./enums/LogMessageDataType";

export class LogMessageData {
  public type: LogMessageDataType;

  public value: string;

  constructor(type: LogMessageDataType, value: string) {
    this.type = type;
    this.value = value;
  }
}
