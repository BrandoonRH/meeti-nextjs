import { auth } from "@/src/lib/auth";
import { SignUpSchemaType } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";

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
      },
    });
    return {
      error: "",
      success: "Cuenta creada correctamente",
    };
  }
}

export const authServices = new AuthServices(authRepository);
