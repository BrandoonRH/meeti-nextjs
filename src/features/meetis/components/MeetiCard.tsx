import { Heading } from "@/src/shared/components";
import { SelectMeeti } from "../types/meeti.types";
import Image from "next/image";
import { displayDate } from "@/src/shared/utils/date";
import Link from "next/link";

interface Props {
  meeti: SelectMeeti;
}
export default function MeetiCard({ meeti }: Props) {
  return (
    <div className="border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="overflow-hidden">
        <Image
          src={meeti.image}
          width={400}
          height={600}
          alt={`Imagen meeti ${meeti.title}`}
          className="object-cover h-72 w-full transition-transform duration-300 ease-in-out hover:scale-120"
        />
      </div>
      <div className="p-5 space-y-5">
        <p className="text-sm text-gray-600">{displayDate(meeti.date)}</p>
        <Heading className="text-2xl font-bold h-16" level={3}>
          {meeti.title}
        </Heading>
        <div className="flex items-center gap-5">
          <p className="line-clamp-2">{meeti.details}</p>
        </div>
        <Link
          href={`/meetis/${meeti.id}`}
          className="bg-orange-500 hover:bg-orange-600 transition-colors text-xl text-white py-3 px-10 mt-10 font-bold block text-center"
        >
          Ver Meeti
        </Link>
      </div>
    </div>
  );
}
