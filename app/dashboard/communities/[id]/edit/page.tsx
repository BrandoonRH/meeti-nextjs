import EditComunity from "@/src/features/communities/components/EditComunity";
import { communityService } from "@/src/features/communities/services/CommunityService";
import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata(
  props: PageProps<"/dashboard/communities/[id]/edit">,
): Promise<Metadata> {
  const { id } = await props.params;
  const community = await communityService.getCommunity(id);

  return {
    title: generatePageTitle(`Editar comunidada ${community.name}`),
    description: `Editar la comunidad ${community.description}`,
    openGraph: {
      title: "Titulo en OpenGraph",
      images: [{ url: community.image }],
    },
  };
}

export default async function EditCommunityPage(
  props: PageProps<"/dashboard/communities/[id]/edit">,
) {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");

  const { id } = await props.params;
  const community = await communityService.getCommunityDetails(
    id,
    session.user,
  );
  //@ts-ignore
  if (community.permissions.canEdit) redirect("/dashboard/communities");

  return (
    <>
      <Heading>Editar Comunidad: {community.data.name}</Heading>
      <Link
        href="/dashboard/communities"
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Volver a mis Comunidades
      </Link>
      <EditComunity community={community.data} />
    </>
  );
}
