import NotificationList from "@/src/features/notifications/components/NotificationList";
import { notificationService } from "@/src/features/notifications/services/NotificationServices";
import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Tus Notificaciones";

export const metadata: Metadata = {
  title: generatePageTitle(title),
};
export default async function NotificationsPage() {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");

  const notifications = await notificationService.getUserNotifications(
    session.user.id,
  );

  await notificationService.clearNotifications(session.user.id);

  return (
    <>
      <Heading>{title}</Heading>
      <NotificationList notifications={notifications} />
    </>
  );
}
