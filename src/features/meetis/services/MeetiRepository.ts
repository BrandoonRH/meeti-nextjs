import { db } from "@/src/db";
import { InserMeeti, SelectMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/src/db/schema";
import { format } from "date-fns";

export interface IMeetiRepository {
  insert(data: InserMeeti): Promise<void>;
  findUpcomingByUserId(userId: string): Promise<SelectMeeti[]>;
}
class MeetiRepository implements IMeetiRepository {
  async insert(data: InserMeeti): Promise<void> {
    const [insertMeeti] = await db.insert(meeti).values(data).returning();
    if (!insertMeeti.virtual && data.location) {
      await db.insert(meetiLocations).values({
        meetiId: insertMeeti.id,
        ...data.location,
      });
    }
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
}

export const meetiRepository = new MeetiRepository();
