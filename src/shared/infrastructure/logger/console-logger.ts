import { Logger, Message } from "@shared/domain/logger";

export class ConsoleLogger implements Logger {
  info(message: Message): void {
    console.log(message);
  }

  error(message: Message): void {
    console.error(message);
  }
}
