import CreateMeeti from "@/src/features/meetis/components/CreateMeeti";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";

const title = "Crea un nuevo Meeti";

export const metadata: Metadata = {
  title: generatePageTitle(title),
};
export default function CreateMeetisPage() {
  
  return (
    <>
      <Heading>{title}</Heading>

      <Link
        href="/dashboard/meetis"
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Volver a los Meetis
      </Link>

      <CreateMeeti/>
    </>
  );
}
