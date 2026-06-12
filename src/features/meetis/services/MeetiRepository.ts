import { db } from "@/src/db";
import {
  FullMeeti,
  InserMeeti,
  InsertMeetiLocation,
  SelectMeeti,
} from "../types/meeti.types";
import { meeti, meetiLocations } from "@/src/db/schema";
import { format } from "date-fns";
import { eq } from "drizzle-orm";

export interface IMeetiRepository {
  insert(data: InserMeeti): Promise<void>;
  findUpcomingByUserId(userId: string): Promise<SelectMeeti[]>;
  findUpcomming(): Promise<SelectMeeti[]>;
  findById(id: string): Promise<SelectMeeti | null>;
  findFullById(id: string): Promise<FullMeeti | null>;
  update(data: InserMeeti, meetiId: string): Promise<void>;
  findUpComingByCommunity(communityId: string): Promise<SelectMeeti[]>;
}
class MeetiRepository implements IMeetiRepository {
  async insert(data: InserMeeti): Promise<void> {
    const [insertMeeti] = await db.insert(meeti).values(data).returning();
    if (!insertMeeti.virtual && data.location) {
      await this.insertLocation({
        meetiId: insertMeeti.id,
        ...data.location,
      });
    }
  }
  async insertLocation(data: InsertMeetiLocation) {
    await db.insert(meetiLocations).values(data);
  }
  async findUpcomingByUserId(userId: string): Promise<SelectMeeti[]> {
    const today = format(new Date(), "yyyy-MM-dd");
    return await db.query.meeti.findMany({
      where: {
        AND: [{ createdBy: { eq: userId } }, { date: { gte: today } }],
      },
      orderBy: {
        date: "asc",
      },
    });
  }
  async findById(id: string): Promise<SelectMeeti | null> {
    const meetiData = await db.query.meeti.findFirst({
      where: {
        id,
      },
      with: {
        location: true,
      },
    });
    return meetiData ?? null;
  }
  async update(data: InserMeeti, meetiId: string): Promise<void> {
    const [updateMeeting] = await db
      .update(meeti)
      .set(data)
      .where(eq(meeti.id, meetiId))
      .returning();
    //update location if virtual event
    if (updateMeeting.virtual && data.location) {
      const locationExist = await db.query.meetiLocations.findFirst({
        where: {
          meetiId: updateMeeting.id,
        },
      });
      if (locationExist) {
        await db
          .update(meetiLocations)
          .set(data.location)
          .where(eq(meetiLocations.meetiId, meetiId));
      } else {
        await this.insertLocation({
          meetiId: updateMeeting.id,
          ...data.location,
        });
      }
    }
  }
  async findFullById(id: string): Promise<FullMeeti | null> {
    const result = await db.query.meeti.findFirst({
      where: {
        id,
      },
      with: {
        location: true,
        category: true,
        community: true,
        admin: true,
      },
    });

    return result ?? null;
  }

  async findUpComingByCommunity(communityId: string): Promise<SelectMeeti[]> {
    const today = format(new Date(), "yyyy-MM-dd");

    return await db.query.meeti.findMany({
      where: {
        communityId,
        date: {
          gte: today,
        },
      },
      limit: 3,
      orderBy: {
        date: "asc",
      },
    });
  }
  async findUpcomming(): Promise<SelectMeeti[]> {
    const now = new Date();
    const nowDate = now.toISOString().slice(0, 10);
    const nowTime = now.toTimeString().slice(0, 5);

    return await db.query.meeti.findMany({
      where: {
        OR: [
          { date: { gte: nowDate } },
          { AND: [{ date: { eq: nowDate } }, { time: { gte: nowTime } }] },
        ],
      },
      orderBy: {
        date: "asc",
        time: "asc",
      },
      limit: 3,
    });
  }
}

export const meetiRepository = new MeetiRepository();
