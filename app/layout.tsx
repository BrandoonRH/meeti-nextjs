import type { Metadata } from "next";
import {Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const outFit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outFit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
