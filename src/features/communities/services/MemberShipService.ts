import { User } from "better-auth";
import {
  IMembershipRepository,
  membershipRepository,
} from "./MemberShipRepository";
import {
  communityRepository,
  ICommunityRepository,
} from "./CommunityRepository";
import { MembershipPolicy } from "../policy/MembershipPolicy";

class MemberShipService {
  constructor(
    private membershipRepository: IMembershipRepository,
    private communityRepository: ICommunityRepository,
  ) {}
  async toogleMemberShip(communityId: string, user: User) {
    const community = await this.communityRepository.findById(communityId);
    if (!community) return;

    const isMember = await this.membershipRepository.isMember(
      communityId,
      user.id,
    );
    if (MembershipPolicy.canJoin(user, community, isMember)) {
      await this.membershipRepository.addMember(communityId, user.id);
      return {
        success: true,
        message: `Te has unido a la comunidad ${community.name}`,
        newPermissions: {
          canJoin: false,
          canLeave: true,
        },
      };
    }
    if (MembershipPolicy.canLeave(user, community, isMember)) {
      await this.membershipRepository.removeMember(communityId, user.id);
      return {
        success: true,
        message: `Has salido la comunidad ${community.name}`,
        newPermissions: {
          canJoin: true,
          canLeave: false,
        },
      };
    }
  }
}

export const membershipService = new MemberShipService(
  membershipRepository,
  communityRepository,
);
