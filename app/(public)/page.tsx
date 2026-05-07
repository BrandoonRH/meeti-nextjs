import Hero from "@/src/shared/components/ui/Hero";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: generatePageTitle("Home"),
};

export default async function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
