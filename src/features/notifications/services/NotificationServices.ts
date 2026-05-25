import { SelectNotification } from "../types/notifications.type";
import {
  INotificationRepository,
  notificationRepository,
} from "./NotificationRepository";

class NotificationService {
  constructor(private notificationRepository: INotificationRepository) {}

  async getUnreadCount(userId: string): Promise<number> {
    return await this.notificationRepository.getUnreadCount(userId);
  }

  async getUserNotifications(userId: string): Promise<SelectNotification[]> {
    return await this.notificationRepository.findByUser(userId);
  }

  async clearNotifications(userId: string): Promise<void> {
    return await this.notificationRepository.delete(userId);
  }
}

export const notificationService = new NotificationService(
  notificationRepository,
);
