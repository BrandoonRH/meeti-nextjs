import { db } from "@/src/db";
import {
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
  findById(id: string): Promise<SelectMeeti | null>;
  update(data: InserMeeti, meetiId: string): Promise<void>;
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
}

export const meetiRepository = new MeetiRepository();
