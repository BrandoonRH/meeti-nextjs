import Link from "next/link";

export default function UserNavigation() {
  return (
    <nav className="flex justify-center items-center mt-5 md:mt-0">
      <Link
        href={"/dashboard"}
        className="font-bold text-sm bg-pink-600 p-2 rounded-md  text-white block w-full text-center" target="_blank"
      >
        Panel de Administración
      </Link>
    </nav>
  );
}
