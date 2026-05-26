import { SelectNotification } from "../types/notifications.type";
import {pusher} from "@/lib/pusher"; 

export interface INotificationPublisher {
    notify(notification: SelectNotification): Promise<void>
}

class NotificationPusher implements INotificationPublisher {
    async notify(notification: SelectNotification): Promise<void> {
        await pusher.trigger(
            `notifications-chanel-${notification.userId}`,
            'new-notification',
            notification
        )
    }
}

export const notificationPusher = new NotificationPusher();