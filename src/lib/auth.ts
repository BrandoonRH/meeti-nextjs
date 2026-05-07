import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "../db";
import { AuthEmailService } from "../emails/service/AuthEmailService";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async (data) => {
      const { user, url } = data;
      await AuthEmailService.sendVerificationEmail({
        email: user.email,
        name: user.name,
        url,
      });
    },
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
  },
  plugins: [nextCookies()],
});

export type User = typeof auth.$Infer.Session.user;
