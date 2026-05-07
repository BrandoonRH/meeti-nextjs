"use server";
import { SigInSchema, SignUpSchema, SignUpSchemaType, SigInSchemaType } from "../schemas/authSchema";
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

export async function signInAction(input: SigInSchemaType): Promise<{ error: string; success: string }> {
  const validation = SigInSchema.safeParse(input);
  if(!validation.success) {
    return {
      error: "Error en la validación de los datos",
      success: "",
    }
  }

  return await authServices.login(validation.data);
}