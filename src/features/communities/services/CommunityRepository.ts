import { db } from "@/src/db";
import {
  CommunityWithMembersCount,
  InsertCommunity,
  SelectCommunity,
} from "../types/communityTypes";
import { community, communityMembers } from "@/src/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { CommunityInput } from "../schemas/communitySchema";

export interface ICommunityRepository {
  create(inputData: InsertCommunity): Promise<SelectCommunity>;
  findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
  findById(id: string): Promise<SelectCommunity | undefined>;
  update(data: CommunityInput, id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findFeatured(): Promise<CommunityWithMembersCount[]>;
}

class CommunityRepository implements ICommunityRepository {
  async create(data: InsertCommunity) {
    const [result] = await db.insert(community).values(data).returning();
    return result;
  }
  async findByUser(userId: string, limit = 10): Promise<SelectCommunity[]> {
    return await db
      .select()
      .from(community)
      .where(eq(community.createdBy, userId))
      .limit(limit);
  }

  async findById(id: string): Promise<SelectCommunity | undefined> {
    const [result] = await db
      .select()
      .from(community)
      .where(eq(community.id, id))
      .limit(1);
    return result;
  }
  async update(data: CommunityInput, id: string): Promise<void> {
    await db
      .update(community)
      .set({
        name: data.name,
        description: data.description,
        image: data.image,
      })
      .where(eq(community.id, id));
  }
  async delete(id: string) {
    await db.delete(community).where(eq(community.id, id));
  }
  async findFeatured(): Promise<CommunityWithMembersCount[]> {
    const membersCount = sql<string>`(
      SELECT COUNT(*) FROM ${communityMembers} WHERE ${communityMembers.communityId} = ${community.id}
    )`;
    return await db
      .select({
        id: community.id,
        name: community.name,
        description: community.description,
        image: community.image,
        membersCount,
      })
      .from(community)
      .orderBy(desc(membersCount))
      .limit(3);
  }
}

export const communityRepository = new CommunityRepository();
