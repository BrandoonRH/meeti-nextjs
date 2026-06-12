import { Heading } from "@/src/shared/components";
import { meetiService } from "../services/MeetiService";
import MeetiCard from "./MeetiCard";

export default async function UpCommingMeetis() {
  const meetis = await meetiService.getUpcomming();
  return (
    <main className="max-w-7xl mx-auto py-10 space-y-5 px-5 lg:px-0">
      <Heading level={2} className="text-center">
        Próximos Meetis
      </Heading>
      {meetis.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
          {meetis.map((meeti) => (
            <MeetiCard key={meeti.id} meeti={meeti} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-lg text-gray-600">
          No hay Próximos Meetis
        </p>
      )}
    </main>
  );
}
