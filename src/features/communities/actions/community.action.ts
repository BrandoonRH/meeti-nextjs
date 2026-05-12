"use server";

import { requiereAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";

export async function createCommunityAction(input: CommunityInput) {
  const data = CommunitySchema.safeParse(input);
  if (!data.success) {
    return {
      error: "Error al validar datos",
      success: "",
    };
  }

  const { session } = await requiereAuth();
  if (!session) {
    return {
      error: "Error al authenticar",
      success: "",
    };
  }

  await communityService.createCommunity(data.data, session.user.id);
  return {
    error: "",
    success: "Comunidad Creada Correctamente",
  };
} //createCommunityAction
