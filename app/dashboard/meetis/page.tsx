import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

const title = "Administra tus Meeties";

export const metadata: Metadata = {
  title: generatePageTitle(title),
};
export default async function MeetisPage() {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");
  return (
    <>
      <Heading>{title}</Heading>

      <Link
        href="/dashboard/meetis/create"
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Crear Meeti
      </Link>
    </>
  );
}
