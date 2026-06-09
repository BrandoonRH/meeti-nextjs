import { db } from "@/src/db";
import { meetiAttendees } from "@/src/db/schema";
import { and, count, eq } from "drizzle-orm";
import { SelectMeetiAttendeeWithUser } from "../types/meeti.types";

export interface IMeetiAttendeesRepository {
  isUserAttending(meetiId: string, userId: string): Promise<boolean>;
  insert(userId: string, meetiId: string): Promise<void>;
  remove(userId: string, meetiId: string): Promise<void>;
  findAttendeesCount(meetiId: string): Promise<number>;
  findAttendeesByMeetiId(
    meetiId: string,
  ): Promise<SelectMeetiAttendeeWithUser[]>;
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository {
  async isUserAttending(meetiId: string, userId: string): Promise<boolean> {
    const result = await db.query.meetiAttendees.findFirst({
      where: {
        AND: [{ meetiId }, { userId }],
      },
    });

    return !!result;
  }

  async insert(userId: string, meetiId: string): Promise<void> {
    await db.insert(meetiAttendees).values({
      userId,
      meetiId,
    });
  }
  async remove(userId: string, meetiId: string): Promise<void> {
    await db
      .delete(meetiAttendees)
      .where(
        and(
          eq(meetiAttendees.userId, userId),
          eq(meetiAttendees.meetiId, meetiId),
        ),
      );
  }
  async findAttendeesCount(meetiId: string): Promise<number> {
    const [result] = await db
      .select({ total: count() })
      .from(meetiAttendees)
      .where(eq(meetiAttendees.meetiId, meetiId));

    return result.total;
  }

  async findAttendeesByMeetiId(
    meetiId: string,
  ): Promise<SelectMeetiAttendeeWithUser[]> {
    return await db.query.meetiAttendees.findMany({
      where: {
        meetiId,
      },
      with: {
        user:  true
        /* {
          columns: {
            name: true,
            email: true
          }
        }, */
      },
    });
  }
}

export const meetiAttendeesRepository = new MeetiAttendeesRepository();
