"use server";
import { requiereAuth } from "@/src/lib/auth-server";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { meetiService } from "../services/MeetiService";

export async function createMeetiAction(input: MeetiInput) {
  const { session } = await requiereAuth();
  if (!session) {
    return {
      error: "No Autenticado",
      success: "",
    };
  }

  const data = MeetiSchema.safeParse(input);
  if (!data.success) {
    return {
      error: "Error al validar los datos",
      success: "",
    };
  }

  await meetiService.createMeeti(data.data, session.user);
  return {
    error: "",
    success: "Meeti creado correctamente",
  };
}
