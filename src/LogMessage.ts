import { LogMessageData } from "./LogMessageData";

export class LogMessage {
  public timestamp: number;

  public message: string;

  public data: Array<LogMessageData>;

  constructor(message: string, data: Array<LogMessageData>) {
    this.timestamp = Date.now();
    this.message = message;
    this.data = data;
  }
}
