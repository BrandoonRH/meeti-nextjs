import { auth } from "@/src/lib/auth";
import {
  SignUpSchemaType,
  SigInSchemaType,
  ForgotPasswordInput,
  SetPasswordInput,
} from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";
import { headers } from "next/headers";
import { APIError } from "better-auth";

class AuthServices {
  constructor(private authRepository: IAuthRepository) {}
  async register(
    credentials: SignUpSchemaType,
  ): Promise<{ error: string; success: string }> {
    const user = await this.authRepository.userExists(credentials.email);

    if (user) {
      return {
        error: "El email ya se encuentra registrado",
        success: "",
      };
    }

    await auth.api.signUpEmail({
      body: {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        callbackURL: `/dashboard`,
      },
      headers: await headers(),
    });
    return {
      error: "",
      success:
        "Cuenta creada correctamente, por favor verifica tu email para activar tu cuenta",
    };
  }

  async login(
    credentials: SigInSchemaType,
  ): Promise<{ error: string; success: string }> {
    const user = await this.authRepository.userExists(credentials.email);

    if (!user) {
      return {
        error: "El email no se encuentra registrado",
        success: "",
      };
    }

    //check password

    try {
      await auth.api.signInEmail({
        body: {
          email: credentials.email,
          password: credentials.password,
          callbackURL: `/dashboard`,
        },
        headers: await headers(),
      });
      return {
        error: "",
        success: "Inicio de sesión exitoso",
      };
    } catch (error) {
      if (error instanceof APIError) {
        const messages: Record<number, string> = {
          401: "Contraseña incorrecta. Por favor, verifica tu contraseña e intenta nuevamente.",
          403: "Cuenta no verificada. Por favor, verifica tu cuenta antes de iniciar sesión.",
        };
        const errorMessage = messages[error.statusCode];
        if (errorMessage) {
          return {
            error: errorMessage,
            success: "",
          };
        }
      }
    }

    //confirm account

    return {
      error: "",
      success: "Inicio de sesión exitoso",
    };
  }

  async requestPasswordReset(input: ForgotPasswordInput) {
    const user = await this.authRepository.userExists(input.email);
    if (!user) {
      return {
        error: "No se encontro el email",
        success: "",
      };
    }

    await auth.api.requestPasswordReset({
      body: {
        email: input.email,
      },
    });
    return {
      error: "",
      success: "Hemos enviado un email con instrucciones, reciba tu bandeja",
    };
  }

  async setPasswordReset(
    input: SetPasswordInput,
    token: string,
  ): Promise<{ error: string; success: string }> {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword: input.new_password,
          token,
        },
      });
      return {
        error: "",
        success: "Password restablecido correctamente",
      };
    } catch (error) {
      if (error instanceof APIError) {
        return {
          error: "Token inválido o Expirado",
          success: "",
        };
      }
      return {
        error: "",
        success: "",
      };
    }
  }
} //AuthServices

export const authServices = new AuthServices(authRepository);
