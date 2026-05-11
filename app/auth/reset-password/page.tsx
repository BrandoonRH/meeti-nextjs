import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Link from "next/link";
import SetPasswordForm from "@/src/features/auth/components/SetPasswordForm";

export const metadata: Metadata = {
  title: generatePageTitle("Restablecer Password"),
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Heading>Restablece tu Contraseña</Heading>
      <SetPasswordForm />

      <nav className="mt-20 flex justify-between">
        <Link href="/auth/register">Crear Cuenta</Link>
        <Link href="/auth/login">Iniciar Sessión</Link>
      </nav>
    </>
  );
}
