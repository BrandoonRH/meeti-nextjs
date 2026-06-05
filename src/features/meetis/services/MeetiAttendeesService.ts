import { User } from "better-auth";
import {
  IMeetiAttendeesRepository,
  meetiAttendeesRepository,
} from "./MeetiAttendeesRepository";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";
import { MeetiAttendeePolicy } from "../policies/MeetiAttendeePolicy";
import {
  INotificationService,
  notificationService,
} from "../../notifications/services/NotificationServices";

class MeetiAttendeesService {
  constructor(
    private readonly meetiAttendeesRepository: IMeetiAttendeesRepository,
    private readonly meetiRepository: IMeetiRepository,
    private readonly notificationService: INotificationService,
  ) {}

  async toggleAttendance(meetiId: string, user: User) {
    const meeti = await this.meetiRepository.findById(meetiId);
    if (!meeti) throw new Error("Meeti no encontrado");
    const isAttending = await this.meetiAttendeesRepository.isUserAttending(
      meeti.id,
      user.id,
    );
    if (MeetiAttendeePolicy.canConfirm(user, meeti, isAttending)) {
      await this.meetiAttendeesRepository.insert(user.id, meeti.id);
      await this.notificationService.createAndNotify({
        userId: meeti.createdBy,
        actorName: user.name,
        message: "Confirmo asistencia al meeti",
        target: "Meeti: " + meeti.title,
      });
      return {
        success: "Confirmaste Asistencia",
        error: "",
        newPermissions: {
          canConfirm: false,
          canCancel: true,
        },
      };
    }
    if (MeetiAttendeePolicy.canCancel(user, meeti, isAttending)) {
      await this.meetiAttendeesRepository.remove(user.id, meeti.id);

      return {
        success: "Cancelaste Asistencia",
        error: "",
        newPermissions: {
          canConfirm: true,
          canCancel: false,
        },
      };
    }
    return {
      success: "Confirmaste Asistencia",
      error: "",
      newPermissions: {
        canConfirm: false,
        canCancel: true,
      },
    };
  }
}

export const meetiAttendeesService = new MeetiAttendeesService(
  meetiAttendeesRepository,
  meetiRepository,
  notificationService,
);
