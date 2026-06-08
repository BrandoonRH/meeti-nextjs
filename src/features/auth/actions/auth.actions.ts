"use server";
import { getClientIp } from "@/src/shared/utils/ip";
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
import { ratelimit } from "@/src/lib/limiter";
import { getMinutesDiffFromNow } from "@/src/shared/utils/date";

export async function signUpAction(
  input: SignUpSchemaType,
): Promise<{ error: string; success: string }> {
  const ip = await getClientIp();
  const { success, reset } = await ratelimit.limit(ip);
  if (!success) {
    return {
      error: `Limite Alcanzado. Intenta de Nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
      success: "",
    };
  }

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
  const ip = await getClientIp();
  const { success, reset } = await ratelimit.limit(ip);
  if (!success) {
    return {
      error: `Limite Alcanzado. Intenta de Nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
      success: "",
    };
  }
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
  const ip = await getClientIp();
  const { success, reset } = await ratelimit.limit(ip);
  if (!success) {
    return {
      error: `Limite Alcanzado. Intenta de Nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
      success: "",
    };
  }

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
  const ip = await getClientIp();
  const { success, reset } = await ratelimit.limit(ip);
  if (!success) {
    return {
      error: `Limite Alcanzado. Intenta de Nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
      success: "",
    };
  }

  const data = SetPasswordSchema.safeParse(input);
  if (!data.success) {
    return {
      error: "Hubo un error al validar",
      success: "",
    };
  }

  return await authServices.setPasswordReset(data.data, token);
}
