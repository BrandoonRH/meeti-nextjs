"use server";
import { SignUpSchema, SignUpSchemaType } from "../schemas/authSchema";
import { authServices } from "../services/AuthService";

export async function signUpAction(input: SignUpSchemaType) {
  const validation = SignUpSchema.safeParse(input);

  if (!validation.success) {
    console.log(validation.error);
    return {
      error: "Error en la validación de los datos",
      success: false,
    };
  }
  const {data} = validation

  await authServices.signUp(data);

  //TODO: SERVICES
}
