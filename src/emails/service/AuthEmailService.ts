import { emailConfig } from "../config";
import {
  renderPasswordResetEmail,
  renderPasswordResetEmailText,
} from "../templates/PasswordResetEmail";
import {
  renderVerificationEmail,
  renderVerificationEmailText,
} from "../templates/VerificationEmail";
import { PasswordResetEmailData, VerificationEmailData } from "../types";
import { EmailService } from "./EmailService";

export class AuthEmailService {
  static async sendVerificationEmail(
    data: VerificationEmailData,
  ): Promise<void> {
    await EmailService.send({
      from: emailConfig.from.verification,
      to: data.email,
      subject: "Confirma tu cuenta en Meeti",
      text: renderVerificationEmailText(data),
      html: renderVerificationEmail(data),
    });
  }

  static async sendPasswordResetToken(
    data: PasswordResetEmailData,
  ): Promise<void> {
    await EmailService.send({
      from: emailConfig.from.passwordReset,
      to: data.email,
      subject: "Meeti - Restalece tu Password",
      text: renderPasswordResetEmailText(data),
      html: renderPasswordResetEmail(data),
    });
  }
}
