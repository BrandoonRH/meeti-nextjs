import { User } from "better-auth";
import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";
import {
  communityRepository,
  ICommunityRepository,
} from "../../communities/services/CommunityRepository";
import { CommunityPolicy } from "../../communities/policy/CommunityPolicy";

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
}

export const meetiService = new MeetiService(
  meetiRepository,
  communityRepository,
);
