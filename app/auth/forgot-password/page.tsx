import { Heading } from "@/src/shared/components";
import { ForgotPasswordForm } from "@/src/features/auth";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: generatePageTitle("Restablecer Password"),
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Heading>Recupera tu acceso a Meeti</Heading>

      <ForgotPasswordForm />

      <nav className="mt-20 flex justify-between">
        <Link href="/auth/register">Crear Cuenta</Link>
        <Link href="/auth/login">Iniciar Sessión</Link>
      </nav>
    </>
  );
}
