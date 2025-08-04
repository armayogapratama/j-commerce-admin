"use client";

import ProfileBars from "@/components/layouts/profiles";
import Sidebars from "@/components/layouts/sidebars";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Sidebars />

          <div className="w-full flex flex-row justify-end px-5 py-3 border-b border-neutral-300 bg-primary-40">
            <ProfileBars />
          </div>
          <main>{children}</main>
        </div>
        <ToastContainer limit={5} pauseOnFocusLoss={false} autoClose={4000} />
      </Suspense>
    </section>
  );
}
