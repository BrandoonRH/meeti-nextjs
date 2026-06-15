import ChangePasswordForm from "@/src/features/auth/components/ChangePasswordForm";
import { Heading } from "@/src/shared/components";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";

const title = "Ajustes y Seguridad";

export const metadata: Metadata = {
  title: generatePageTitle(title),
};

export default function SecurityPage() {
  return (
    <>
      <Heading>{title}</Heading>

      <ChangePasswordForm/>
    </>
  );
}
