import { db } from "@/src/db";
import { User } from "../../auth/types";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface IProfileRepositopry {
  findById(userId: string): Promise<User>;
}

class ProfileRepository implements IProfileRepositopry {
  async findById(userId: string): Promise<User> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return user;
  }
}

export const profileRepository = new ProfileRepository();
