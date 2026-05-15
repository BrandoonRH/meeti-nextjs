import { db } from "@/src/db";
import { InsertCommunity, SelectCommunity } from "../types/communityTypes";
import { community } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { CommunityInput } from "../schemas/communitySchema";

export interface ICommunityRepository {
  create(inputData: InsertCommunity): Promise<SelectCommunity>;
  findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
  findById(id: string): Promise<SelectCommunity | undefined>;
  update(data: CommunityInput, id: string): Promise<void>;
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
}

export const communityRepository = new CommunityRepository();
