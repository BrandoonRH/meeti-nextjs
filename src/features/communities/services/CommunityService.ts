import { success, User } from "better-auth";
import { CommunityInput } from "../schemas/communitySchema";
import {
  communityRepository,
  ICommunityRepository,
} from "./CommunityRepository";
import { CommunityPolicy } from "../policy/CommunityPolicy";
import { MembershipPolicy } from "../policy/MembershipPolicy";
import { notFound } from "next/navigation";
import { checkPassword } from "@/src/shared/utils/auth";
import { deleteUTFiles } from "@/src/lib/uploadthing-server";

export interface ICommunityService {}
class CommunityService implements ICommunityService {
  constructor(private communityRepository: ICommunityRepository) {}

  async createCommunity(data: CommunityInput, userId: string) {
    const community = await this.communityRepository.create({
      ...data,
      createdBy: userId,
    });
    return community;
  }

  async getUserCommunities(user: User) {
    const communities = await this.communityRepository.findByUser(user.id);
    return await Promise.all(
      communities.map(async (community) => {
        const isMember = true;
        const isAdmin = CommunityPolicy.isAdmin(user, community);
        return {
          data: community,
          context: {
            isMember,
            isAdmin,
          },
          permissions: {
            canEdit: CommunityPolicy.canEdit(user, community),
            canDelete: CommunityPolicy.canDelete(user, community),
            canViewMembers: CommunityPolicy.canViewMembers(user, community),
            canJoin: MembershipPolicy.canJoin(user, community, isMember),
            canLeave: MembershipPolicy.canLeave(user, community, isMember),
          },
        };
      }),
    );
  }

  async getCommunity(id: string) {
    const community = await this.communityRepository.findById(id);
    if (!community) notFound();
    return community;
  }

  async getCommunityDetails(id: string, user: User) {
    const community = await this.getCommunity(id);
    const isMember = false;
    const isAdmin = CommunityPolicy.isAdmin(user, community);

    return {
      data: community,
      context: {
        isMember,
        isAdmin,
      },
      permissions: {
        canEdit: CommunityPolicy.canEdit(user, community),
        canDelete: CommunityPolicy.canDelete(user, community),
        canViewMembers: CommunityPolicy.canViewMembers(user, community),
        canJoin: MembershipPolicy.canJoin(user, community, isMember),
        canLeave: MembershipPolicy.canLeave(user, community, isMember),
      },
    };
  }

  async updateCommunity(data: CommunityInput, id: string, user: User) {
    const community = await this.getCommunity(id);
    if (!CommunityPolicy.canEdit(user, community)) {
      throw new Error("No tienes permisos para actualizar esta comunidad");
    }
    await this.communityRepository.update(data, community.id);
  }

  async deleteCommunity(id: string, password: string, user: User) {
    const community = await this.getCommunity(id);
    if (!CommunityPolicy.canDelete(user, community)) {
      /* throw new Error("No tienes permnisos para eliminar esta comunidad"); */
      return {
        error: "No tienes permnisos para eliminar esta comunidad",
        success: "",
      };
    }

    const isValidPassword = await checkPassword(password);
    if (!isValidPassword) {
      return {
        error: "El password es incorrecto",
        success: "",
      };
    }

    //delete image;
    await deleteUTFiles(community.image);
    await this.communityRepository.delete(id);

    return {
      error: "",
      success: "Comunidad Eliminada Correctamenmte",
    };
  }
}

export const communityService = new CommunityService(communityRepository);
