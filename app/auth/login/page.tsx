import Heading from "@/src/shared/components/typegraphy/Heading";
import { LoginForm } from "@/src/shared/features/auth";

import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle("Iniciar Sesión")
}

export default function LoginPage() {
  return (
    <>
      <Heading>Iniciar Sesión</Heading>
      <LoginForm/>

      <nav className="mt-20 flex justify-between">
        <Link href="/auth/register">Crear Cuenta</Link>
        <Link href="/auth/forgot-password">Recuperar Contraseña</Link>
      </nav>
    </>
  )
}