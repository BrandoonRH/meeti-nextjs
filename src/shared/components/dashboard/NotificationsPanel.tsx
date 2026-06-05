"use client";

import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Pusher from "pusher-js";
import { useSession } from "@/src/lib/auth-client";
import { SelectNotification } from "@/src/features/notifications/types/notifications.type";

// ❌ ELIMINAMOS la constante global `notifications` con el fetch

function NotificationCount() {
  // Inicializamos en 0 (o en null si prefieres mostrar un skeleton)
  const [totalNotifications, setTotalNotification] = useState(0);
  const { data } = useSession();

  useEffect(() => {
    // Evita hacer peticiones o conectar Pusher si aún no hay usuario
    if (!data?.user?.id) return;

    // 1. Consultar el estado inicial de notificaciones SOLO en el cliente
    const fetchInitialNotifications = async () => {
      try {
        const res = await fetch("/api/user/notifications");
        const count = await res.json();
        setTotalNotification(count);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    fetchInitialNotifications();

    // 2. Configurar la conexión con Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_KEY_PUSHER_CLUSTER!,
    });

    const id = `notifications-chanel-${data.user.id}`;
    const channel = pusher.subscribe(id);

    channel.bind("new-notification", (notificationData: SelectNotification) => {
      setTotalNotification((prev) => prev + 1);
    });

    // Limpieza al desmontar
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data?.user?.id]); // Usar el ID como dependencia es más seguro que todo el objeto 'data'

  return (
    <Link
      href={"/dashboard/notifications"}
      className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon aria-hidden="true" className="size-6" />
      {totalNotifications > 0 && (
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white p-2">
          {totalNotifications}
        </span>
      )}
    </Link>
  );
}

export default function NotificationsPanel() {
  // Como ya manejas el estado en NotificationCount, puedes quitar el Suspense y el hook "use"
  return <NotificationCount />;
}

/* import { Suspense, use, useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Pusher from "pusher-js";
import { useSession } from "@/src/lib/auth-client";
import { SelectNotification } from "@/src/features/notifications/types/notifications.type";

const notifications = fetch("/api/user/notifications").then((res) =>
  res.json(),
);

function NotificationCount() {
  const unreadNotification: number = use(notifications);
  const [totalNotifications, setTotalNotification] =
    useState(unreadNotification);
  const { data } = useSession();

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_KEY_PUSHER_CLUSTER!,
    });

    const id = `notifications-chanel-${data?.user.id}`;
    const channel = pusher.subscribe(id);
    channel.bind("new-notification", (data: SelectNotification) => {
      setTotalNotification((prev) => prev + 1);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [data]);

  return (
    <Link
      href={"/dashboard/notifications"}
      className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:hover:text-white"
    >
      <span className="sr-only">View notifications</span>
      <BellIcon aria-hidden="true" className="size-6" />
      {totalNotifications > 0 && (
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white p-2">
          {totalNotifications}
        </span>
      )}
    </Link>
  );
}

export default function NotificationsPanel() {
  return (
    <Suspense fallback="Cargando...">
      <NotificationCount />;
    </Suspense>
  );
}
 */
