"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold text-neutral-80">
        Selamat Datang Di Dashboard Admin JCommerce
      </h1>

      <Button
        className="w-3/12 text-white bg-primary-40 hover:bg-primary-50"
        onClick={() => router.push("/products")}>
        Product
      </Button>
    </main>
  );
}
