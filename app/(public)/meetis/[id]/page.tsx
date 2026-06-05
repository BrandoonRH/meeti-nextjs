import { meetiService } from "@/src/features/meetis/services/MeetiService";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";
import { classNames } from "../../../../src/shared/utils/ui";
import { Heading } from "@/src/shared/components";
import Image from "next/image";
import Location from "@/src/features/meetis/components/MeetiLocation";
import { DynamicMeetiLocation } from "@/src/features/meetis/components/DynamicMeetiLocation";
import { displayDate } from "@/src/shared/utils/date";
import OrganizerCard from "@/src/features/meetis/components/OrganizerCard";
import { requiereAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import AttendanceToggleButton from "@/src/features/meetis/components/AttendanceToggleButton";

export async function generateMetadata({
  params,
}: PageProps<"/meetis/[id]">): Promise<Metadata> {
  const { id } = await params;
  const meeti = await meetiService.getMeetiById(id);
  return {
    title: generatePageTitle(`${meeti.title}`),
    openGraph: {
      title: generatePageTitle(`${meeti.title}`),
      siteName: "Meeti",
      images: [
        {
          url: meeti.image,
          width: 1000,
          height: 600,
          alt: `Imagen del Meeti ${meeti.title}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: generatePageTitle(`${meeti.title}`),
      description: `Únete al Meeti ${meeti.title} el ${meeti.date} a las ${meeti.time}. ¡No te lo pierdas!`,
      images: [meeti.image],
    },
  };
}
export default async function MeetiPage(props: PageProps<"/meetis/[id]">) {
  const { session } = await requiereAuth();
  /*   if (!session)
    redirect("/auth/login?message=Debes iniciar sesión para ver el meeti"); */

  const { id } = await props.params;
  const meeti = await meetiService.getMeetiWithDetails(id, session?.user);

  if (meeti.context.isPastMeeti)
    throw new Error("El meeti ya no esta disponible");
  const { virtual: isVirtual, location } = meeti.data;

  return (
    <>
      <nav className="py-5 border-b border-gray-200 px-5 lg:px-0">
        <div className="max-w-7xl mx-auto flex flex-col gap-3  items-start lg:flex-row lg:justify-between lg:gap-0">
          <p className=" text-gray-600">
            Categoría:{" "}
            <Link
              className="font-black"
              href={`/categories/${meeti.data.category.id}`}
            >
              {meeti.data.category.name}
            </Link>
          </p>
          <p className=" text-gray-600">
            Comunidad:{" "}
            <Link
              className="font-black"
              href={`/communities/${meeti.data.community.id}`}
            >
              {meeti.data.community.name}
            </Link>
          </p>
        </div>
      </nav>
      {meeti.permissions && !meeti.context.isAdmin && (
        <div className="max-w-7xl mx-auto my-10 flex justify-end">
          <AttendanceToggleButton
            meetiId={meeti.data.id}
            permissions={meeti.permissions}
          />
        </div>
      )}
      <Heading className="text-center mt-10 ">{meeti.data.title}</Heading>

      <main className="max-w-7xl mx-auto grid grid-cols-1 gap-5 lg:grid-cols-3 p-5 lg:px-0 mt-10">
        <section className="lg:col-span-2">
          <Image
            src={meeti.data.image}
            alt={meeti.data.title}
            width={1000}
            height={600}
            priority
          />
          <p className="text-gray-600 mt-5 text-lg">{meeti.data.details}</p>
        </section>

        <aside className="bg-slate-100 rounded-2xl">
          {isVirtual && (
            <p className="bg-orange-400 mt- rounded-lg text-center p-3 text-white font-bold">
              Este Meeti es Virtual
            </p>
          )}

          {location && !isVirtual && (
            <DynamicMeetiLocation
              address={location.address}
              lat={location.lat}
              lng={location.lng}
              placeName={location.placeName}
            />
          )}
          <section className="space-y-5 p-10 ">
            <Heading level={2} className="Información Meeti">
              {" "}
              Información Meeti
            </Heading>
            <p>
              <span className="font-bold">Fecha:</span>{" "}
              {displayDate(meeti.data.date)}
            </p>
            <p>
              <span className="font-bold">Hora:</span> {meeti.data.time}
            </p>
            <OrganizerCard organizer={meeti.data.admin} />
          </section>
        </aside>
      </main>
    </>
  );
}
