"use client";

import { formatCreatedDate } from "@/src/shared/utils/date";
import { SelectNotification } from "../types/notifications.type";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useSession } from "@/src/lib/auth-client";

interface Props {
  notifications: SelectNotification[];
}
export default function NotificationList({ notifications }: Props) {
  const [unReadNotifications, setUnreadNotifications] =
    useState<SelectNotification[]>(notifications);

  const { data } = useSession();
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_KEY_PUSHER_CLUSTER!,
    });

    const id = `notifications-chanel-${data?.user.id}`;
    const channel = pusher.subscribe(id);
    channel.bind("new-notification", (data: SelectNotification) => {
      setUnreadNotifications((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);

  return (
    <div className="space-y-4 mt-10">
      {unReadNotifications.length ? (
        unReadNotifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 rounded-lg shadow-xs shadow-gray-300"
          >
            <p>
              {notification.actorName} - {notification.message}{" "}
              <span className="text-sm text-gray-500 font-bold">
                {notification.target}
              </span>
            </p>
            <p>{formatCreatedDate(notification.createdAt)}</p>
          </div>
        ))
      ) : (
        <p className="text-center mt-10 text-lg text-gray-600">
          No tienes notificaciones
        </p>
      )}
    </div>
  );
}
