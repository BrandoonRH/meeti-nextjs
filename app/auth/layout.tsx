import Logo from "@/src/shared/components/ui/Logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="flex justify-center pt-8 sm:pt-12">
          <Link href="/" className="w-40 sm:w-48">
            <Logo />
          </Link>
        </div>
        <main className="py-8 sm:py-12">{children}</main>
      </div>
    </div>
  );
}
