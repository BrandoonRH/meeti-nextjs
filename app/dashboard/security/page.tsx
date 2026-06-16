import ActiveSessionsList from "@/src/features/auth/components/ActiveSessionsList";
import ChangePasswordForm from "@/src/features/auth/components/ChangePasswordForm";
import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Ajustes y Seguridad";

export const metadata: Metadata = {
  title: generatePageTitle(title),
};

export default async function SecurityPage() {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");
  return (
    <>
      <Heading>{title}</Heading>

      <ChangePasswordForm />
      <ActiveSessionsList />
    </>
  );
}
