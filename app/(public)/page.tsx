import Hero from "@/src/shared/components/ui/Hero";
import { generatePageTitle } from "@/src/shared/utils/Metadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata : Metadata ={
  title: generatePageTitle('Home')
}

export default function Home() {
  
  return (
    <>
      <Hero/>
    </>
  );
}