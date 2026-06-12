import Hero from "@/src/shared/components/ui/Hero";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import UpCommingMeetis from "../../src/features/meetis/components/UpCommingMeetis";
import FeatureCommunities from "@/src/features/communities/components/FeatureCommunities";

export const metadata: Metadata = {
  title: generatePageTitle("Home"),
};

export default async function Home() {
  return (
    <>
      <Hero />
      <UpCommingMeetis/>
      <FeatureCommunities/>
    </>
  );
}
