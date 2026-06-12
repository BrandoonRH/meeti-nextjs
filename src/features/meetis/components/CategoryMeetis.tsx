import { meetiService } from "../services/MeetiService";
import MeetiCard from "./MeetiCard";

interface Props {
  categoryId: string;
}
export default async function CategoryMeetis({ categoryId }: Props) {
  const meetis = meetiService.getMeetisByCategory(categoryId);
  return (
    <>
      {(await meetis).length ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 lg:px-0 py-10">
          {(await meetis).map((meeti) => (
            <MeetiCard key={meeti.id} meeti={meeti} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-lg text-gray-600">
          No hay proximos meetis en esta categoría
        </p>
      )}
    </>
  );
}
