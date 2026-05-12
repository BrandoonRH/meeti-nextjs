import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle("Comunidades a las que te uniste"),
};
export default function JoinedCommunitiesPage() {
  return (
    <>
      <Heading>Comunidades a las que te uniste</Heading>
      <Link
        href="/dashboard/communities"
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Volver a mis Comunidades
      </Link>
    </>
  );
}
