import { User } from "better-auth";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";
import {
  communityRepository,
  ICommunityRepository,
} from "../../communities/services/CommunityRepository";
import { CommunityPolicy } from "../../communities/policy/CommunityPolicy";
import { MeetiPolicy } from "../policies/MeetiPolicy";

interface IMeetiService {}
class MeetiService /* implements IMeetiService */ {
  constructor(
    private readonly meetiRepository: IMeetiRepository,
    private readonly communityRepository: ICommunityRepository,
  ) {}

  async createMeeti(data: MeetiInput, user: User) {
    const community = await this.communityRepository.findById(data.communityId);
    if (!community || !CommunityPolicy.isAdmin(user, community)) {
      throw new Error("No tienes Permisos");
    }
    await this.meetiRepository.insert({ ...data, createdBy: user.id });
  }

  async getUpComingMeetisByUser(user: User) {
    const upcomingMeetis = await this.meetiRepository.findUpcomingByUserId(
      user.id,
    );
    return await Promise.all(
      upcomingMeetis.map(async (meeti) => {
        return {
          data: meeti,
          attendanceCount: 0,
          context: {
            isAdmin: MeetiPolicy.isAdmin(user, meeti),
          },
          permission: {
            canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
            canEdit: MeetiPolicy.canEdit(user, meeti),
            canDelete: MeetiPolicy.canDelete(user, meeti),
          },
        };
      }),
    );
  }

  async getMeetiById(meetiId: string) {
    const meeti = await this.meetiRepository.findById(meetiId);
    if (!meeti) throw new Error("Meeti no encontrado");
    return meeti;
  }

  async getMeetiWithPermissions(meetiId: string, user: User) {
    const meeti = await this.getMeetiById(meetiId);
    return {
      data: meeti,
      context: {
        isAdmin: MeetiPolicy.isAdmin(user, meeti),
      },
      permissions: {
        canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
        canEdit: MeetiPolicy.canEdit(user, meeti),
        canDelete: MeetiPolicy.canDelete(user, meeti),
      },
    };
  }

  async updateMeeti(meetiId: string, data: MeetiInput, user: User) {
    const community = await this.communityRepository.findById(data.communityId);
    if (!community || !CommunityPolicy.isAdmin(user, community)) {
      throw new Error("No tienes Permisos");
    }
    const meeti = await this.getMeetiWithPermissions(meetiId, user);
    if (!meeti.permissions.canEdit) {
      throw new Error("No tienes Permisos");
    }
    await this.meetiRepository.update(
      { ...data, createdBy: user.id },
      meeti.data.id,
    );
  }
}

export const meetiService = new MeetiService(
  meetiRepository,
  communityRepository,
);
