import ProfileForm from "@/src/features/profile/components/ProfileForm";
import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Admnistra tu Perfil";

export const metadata: Metadata = {
  title: generatePageTitle(title),
};

export default async function ProfilePage() {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");

  return (
    <>
      <Heading>{title}</Heading>
      <ProfileForm user={session.user} />
    </>
  );
}
