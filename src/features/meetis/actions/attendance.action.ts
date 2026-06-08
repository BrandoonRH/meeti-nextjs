"use server";
import { requiereAuth } from "@/src/lib/auth-server";
import { meetiAttendeesService } from "../services/MeetiAttendeesService";
import { getClientIp } from "@/src/shared/utils/ip";
import { ratelimit } from "@/src/lib/limiter";
import { getMinutesDiffFromNow } from "@/src/shared/utils/date";

export async function toggleAttendance(meetiId: string, canConfirm: boolean) {
  const ip = await getClientIp();
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);
  if (!success) {
    /*  throw new Error(
      `Limite Alcanzado. Intenta de Nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
    ); */
    return {
      error: `Limite Alcanzado. Intenta de Nuevo en ${getMinutesDiffFromNow(reset)} Minutos`,
      success: "",
      newPermissions: {
        canConfirm,
        canCancel: !canConfirm,
      },
    };
  }

  const { session } = await requiereAuth();
  if (!session) throw new Error("Usuario no Autenticado");

  return await meetiAttendeesService.toggleAttendance(meetiId, session.user);
}
