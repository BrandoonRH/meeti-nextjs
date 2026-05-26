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
import { CommunityPolicy } from "../policy/CommunityPolicy";
import {
  INotificationService,
  notificationService,
} from "../../notifications/services/NotificationServices";

class MemberShipService {
  constructor(
    private membershipRepository: IMembershipRepository,
    private communityRepository: ICommunityRepository,
    private notificationService: INotificationService,
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
      //notification
      await this.notificationService.createAndNotify({
        userId: community.createdBy,
        actorName: user.name,
        message: "Se unión a tu comunidad",
        target: community.name,
      });
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

  async getJoinedCommunities(user: User) {
    const communities =
      await this.membershipRepository.findJoinedCommunities(user);

    return await Promise.all(
      communities.map(async (community) => {
        const isMember = true;
        const isAdmin = CommunityPolicy.isAdmin(user, community.community);
        const memberCount = await this.membershipRepository.getMemberCount(
          community.community.id,
        );
        return {
          data: community.community,
          memberCount,
          context: {
            isMember,
            isAdmin,
          },
          permissions: {
            canEdit: CommunityPolicy.canEdit(user, community.community),
            canDelete: CommunityPolicy.canDelete(user, community.community),
            canViewMembers: CommunityPolicy.canViewMembers(
              user,
              community.community,
            ),
            canJoin: MembershipPolicy.canJoin(
              user,
              community.community,
              isMember,
            ),
            canLeave: MembershipPolicy.canLeave(
              user,
              community.community,
              isMember,
            ),
          },
        };
      }),
    );
  }
}

export const membershipService = new MemberShipService(
  membershipRepository,
  communityRepository,
  notificationService,
);
