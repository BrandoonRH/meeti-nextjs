import { db } from "@/src/db";
import { InserMeeti } from "../types/meeti.types";
import { meeti, meetiLocations } from "@/src/db/schema";

export interface IMeetiRepository {
  insert(data: InserMeeti): Promise<void>;
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
}

export const meetiRepository = new MeetiRepository();
