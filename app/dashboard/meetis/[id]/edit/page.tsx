import EditMeeti from "@/src/features/meetis/components/EditMeeti";
import { meetiService } from "@/src/features/meetis/services/MeetiService";
import { requiereAuth } from "@/src/lib/auth-server";
import { Heading } from "@/src/shared/components";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/dashboard/meetis/[id]/edit">) {
  const { id } = await params;
  const meeti = await meetiService.getMeetiById(id);
  return {
    title: `Editar Meeti: ${meeti.title}`,
    description: `Edita el meeti ${meeti.title} en tu dashboard`,
  };
}

export default async function EditMeetiPage(
  props: PageProps<"/dashboard/meetis/[id]/edit">,
) {
  const { session } = await requiereAuth();
  if (!session) redirect("/auth/login");
  const { id } = await props.params;
  const meeti = await meetiService.getMeetiWithPermissions(id, session.user);

  if (!meeti.context.isAdmin)
    throw new Error("No tienes permisos para editar este meeti");

  return (
    <>
      <Heading>Editar Meeti: {meeti.data.title}</Heading>

      <Link
        href="/dashboard/meetis"
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >
        Volver a los Meetis
      </Link>
      <EditMeeti meeti={meeti.data} />
    </>
  );
}
