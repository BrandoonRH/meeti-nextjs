import { formatCreatedDate } from "@/src/shared/utils/date"
import { SelectNotification } from "../types/notifications.type"

interface Props {
    notifications: SelectNotification[]
}
export default function NotificationList({notifications}: Props) {
  return (
    <div className="space-y-4 mt-10">
        {notifications.length ? (
            notifications.map((notification) => (
                <div key={notification.id} className="p-4 rounded-lg shadow-xs shadow-gray-300">
                    <p>
                        {notification.actorName} - {notification.message} {' '}
                        <span className="text-sm text-gray-500 font-bold">{notification.target}</span>
                    </p>
                    <p>
                        {formatCreatedDate(notification.createdAt)}
                    </p>
                </div>
            ))
        ): (
            <p className="text-center mt-10 text-lg text-gray-600">
                No tienes notificaciones
            </p>
        )}
    </div>
  )
}
