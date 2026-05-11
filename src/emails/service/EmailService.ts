import { transporter } from "@/lib/nodemailer";
import { EmailOptions } from "../types";

export class EmailService {
  static async send(options: EmailOptions): Promise<void> {
    try {
      await transporter.sendMail(options);
    } catch (error) {
      console.error("Error enviando email:", error);
      throw new Error("No se pudo enviar el email");
    }
  }
}
