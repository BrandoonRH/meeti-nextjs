"use server";

import { requiereAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";
import {
  CheckPasswordInput,
  CheckPasswordSchema,
} from "../../auth/schemas/authSchema";

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

export async function editCommunityAction(input: CommunityInput, id: string) {
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

  await communityService.updateCommunity(data.data, id, session.user);
  return {
    error: "",
    success: "Actualiazación exitosa!",
  };
}

export async function deleteCommunityAction(
  input: CheckPasswordInput,
  id: string,
): Promise<{ success: string; error: string }> {
  const { session } = await requiereAuth();

  if (!session) {
    return {
      error: "Error en authenticación",
      success: "",
    };
  }
  const data = CheckPasswordSchema.safeParse(input);
  if (!data.success) {
    {
      return {
        error: "Error validar contraseña",
        success: "",
      };
    }
  }

  return  await communityService.deleteCommunity(id, input.password, session.user ); 

}
