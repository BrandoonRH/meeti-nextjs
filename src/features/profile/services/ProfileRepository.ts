import { db } from "@/src/db";
import { User } from "../../auth/types";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { FullProfile } from "../types/profile.types";
import { format } from "date-fns";

export interface IProfileRepositopry {
  findById(userId: string): Promise<User>;
  findFullProfileById(userId: string): Promise<FullProfile | undefined>;
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
  async findFullProfileById(userId: string): Promise<FullProfile | undefined> {
    const today = format(new Date(), "yyyy-MM-dd");

    const result = await db.query.users.findFirst({
      where: {
        id: userId,
      },
      with: {
        communities: {
          limit: 3,
        },
        meeties: {
          limit: 3,
          where: {
            date: {
              gte: today,
            },
          },
          orderBy: {
            date: 'asc'
          }
        },
      },
    });
    return result;
  }
}

export const profileRepository = new ProfileRepository();
