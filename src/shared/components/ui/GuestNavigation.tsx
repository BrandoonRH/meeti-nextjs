import Link from "next/link";
import React from "react";

export default function GuestNavigation() {
  return (
    <nav className="flex justify-center rounded-md items-center gap-4 mt-5 md:mt-0">
      <Link className="font-bold text-sm" href="/auth/login">
        Iniciar Sesión
      </Link>
      <Link
        className=" font-bold text-sm rounded-md bg-pink-600 p-2  text-white "
        href="/auth/register"
      >
        Registrarse
      </Link>
    </nav>
  );
}
