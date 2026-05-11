"use server";
import {
  SigInSchema,
  SignUpSchema,
  SignUpSchemaType,
  SigInSchemaType,
  ForgotPasswordInput,
  ForgotPasswordSchema,
  SetPasswordInput,
  SetPasswordSchema,
} from "../schemas/authSchema";
import { authServices } from "../services/AuthService";

export async function signUpAction(
  input: SignUpSchemaType,
): Promise<{ error: string; success: string }> {
  const validation = SignUpSchema.safeParse(input);

  if (!validation.success) {
    return {
      error: "Error en la validación de los datos",
      success: "",
    };
  }
  return await authServices.register(validation.data);
}

export async function signInAction(
  input: SigInSchemaType,
): Promise<{ error: string; success: string }> {
  const validation = SigInSchema.safeParse(input);
  if (!validation.success) {
    return {
      error: "Error en la validación de los datos",
      success: "",
    };
  }

  return await authServices.login(validation.data);
}

export async function ForgotPasswordAction(
  input: ForgotPasswordInput,
): Promise<{ error: string; success: string }> {
  const data = ForgotPasswordSchema.safeParse(input);
  if (!data.success) {
    return {
      error: "Hubo un error al validar correo",
      success: "",
    };
  }
  return await authServices.requestPasswordReset(data.data);
}

export async function setPasswordAction(
  input: SetPasswordInput,
  token: string,
): Promise<{ error: string; success: string }> {
  const data = SetPasswordSchema.safeParse(input);
  if (!data.success) {
    return {
      error: "Hubo un error al validar",
      success: "",
    };
  }

  return await authServices.setPasswordReset(data.data, token);
}
