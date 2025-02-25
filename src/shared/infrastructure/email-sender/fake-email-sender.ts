import { EmailSender } from "@shared/domain/email-sender";
import { Logger } from "@shared/domain/logger";

export class FakeEmailSender implements EmailSender {
  constructor(private readonly logger: Logger) {}

  async sendMessage(email: string, text: string): Promise<void> {
    this.logger.info(
      `[FakeEmailSender] - Sending email to "${email}": ${text}`
    );
  }
}
