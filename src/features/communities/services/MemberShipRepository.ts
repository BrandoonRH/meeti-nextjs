import { db } from "@/src/db";
import { communityMembers } from "@/src/db/schema";
import { User } from "better-auth";
import { and, eq } from "drizzle-orm";
import { JoinedCommunity } from "../types/communityTypes";

export interface IMembershipRepository {
  addMember(communityId: string, userId: string): Promise<void>;
  removeMember(communityId: string, userId: string): Promise<void>;
  isMember(communityId: string, userId: string): Promise<boolean>;
  findJoinedCommunities(user: User): Promise<JoinedCommunity[]>;
}

class MmemberShipRepository implements IMembershipRepository {
  async addMember(communityId: string, userId: string): Promise<void> {
    await db.insert(communityMembers).values({
      communityId,
      userId,
    });
  }

  async removeMember(communityId: string, userId: string): Promise<void> {
    await db
      .delete(communityMembers)
      .where(
        and(
          eq(communityMembers.communityId, communityId),
          eq(communityMembers.userId, userId),
        ),
      );
  }

  async isMember(communityId: string, userId: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(communityMembers)
      .where(
        and(
          eq(communityMembers.communityId, communityId),
          eq(communityMembers.userId, userId),
        ),
      )
      .limit(1);
    return !!result;
  }

  async findJoinedCommunities(user: User): Promise<JoinedCommunity[]> {
    return await db.query.communityMembers.findMany({
      where: {
        userId: user.id,
      },
      with: {
        community: true,
        user: true,
      },
    });
  }
}

export const membershipRepository = new MmemberShipRepository();
