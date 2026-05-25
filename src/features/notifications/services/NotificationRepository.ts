import { db } from "@/src/db";
import {
  InsertNotification,
  SelectNotification,
} from "../types/notifications.type";
import { notifications } from "@/src/db/schema";
import { and, count, eq } from "drizzle-orm";

export interface INotificationRepository {
  craete(data: InsertNotification): Promise<SelectNotification>;
  getUnreadCount(userId: string): Promise<number>;
  findByUser(userId: string): Promise<SelectNotification[]>;
  delete(userId: string): Promise<void>;
}

class NotificationRepository implements INotificationRepository {
  async craete(data: InsertNotification): Promise<SelectNotification> {
    const [result] = await db.insert(notifications).values(data).returning();
    return result;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(notifications)
      .where(
        and(eq(notifications.userId, userId), eq(notifications.read, false)),
      );
    return result[0].count;
  }
  async findByUser(userId: string): Promise<SelectNotification[]> {
    return await db.query.notifications.findMany({
      where: {
        /*  userId: {eq: userId} */
        AND: [{ userId: { eq: userId } }, { read: { eq: false } }],
      },
      limit: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async delete(userId: string): Promise<void> {
    await db
      .update(notifications)
      .set({
        read: true,
      })
      .where(eq(notifications.userId, userId));
  }
}

export const notificationRepository = new NotificationRepository();
