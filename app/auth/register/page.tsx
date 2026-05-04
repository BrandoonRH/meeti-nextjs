import Heading from "@/src/shared/components/typegraphy/Heading";
import { RegisterForm } from "@/src/shared/features/auth";

import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle("Crear Cuenta"),
};

export default function RegisterPage() {
  return (
    <>
      <Heading>Crear Cuenta</Heading>
      <RegisterForm />
      <nav className="mt-20 flex justify-between">
        <Link href="/auth/login">Iniciar Sessión</Link>
        <Link href="/auth/forgot-password">Recuperar Contraseña</Link>
      </nav>
    </>
  );
}
