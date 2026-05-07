import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { isAuthenticated } = await requiereAuth();
  if (!isAuthenticated) redirect("/auth/login");
  return (
    <>
      <Heading>Dashboard</Heading>
    </>
  );
}
