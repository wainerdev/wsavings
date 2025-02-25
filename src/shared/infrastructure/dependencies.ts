import { FakeEmailSender } from "@shared/infrastructure/email-sender/fake-email-sender";
import { ConsoleLogger } from "@shared/infrastructure/logger/console-logger";

export const logger = new ConsoleLogger();
export const emailSender = new FakeEmailSender(logger);
