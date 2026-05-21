import CommunityItem from "@/src/features/communities/components/CommunityItem";
import { membershipService } from "@/src/features/communities/services/MemberShipService";
import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: generatePageTitle("Comunidades a las que te uniste"),
};
export default async function JoinedCommunitiesPage() {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");

  const communities = await membershipService.getJoinedCommunities(
    session.user,
  );

  return (
    <>
      <Heading>Comunidades a las que te uniste</Heading>
      <Link
        href="/dashboard/communities"
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Volver a mis Comunidades
      </Link>

      {communities.length ? (
        <ul
          role="list"
          className="divede-y divide-gray-100 mt-10 shadow-lg p-10"
        >
          {communities.map((community) => (
            <CommunityItem key={community.data.id} community={community} />
          ))}
        </ul>
      ) : (
        <p className="text-center mt-10 text-lg">
          NO te has unido a una comunidad aún{" "}
        </p>
      )}
    </>
  );
}
