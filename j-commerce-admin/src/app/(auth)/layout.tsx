"use client";

import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [queryClient] = useState(() => new QueryClient());
  return (
    <section className="bg-gradient-to-bl from-primary-40 to-primary-30 bg-opacity-25 w-screen h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <QueryClientProvider client={queryClient}> */}
        <div>
          <main className="w-screen h-screen">{children}</main>
        </div>
        {/* </QueryClientProvider> */}

        <ToastContainer limit={5} pauseOnFocusLoss={false} autoClose={4000} />
      </Suspense>
    </section>
  );
}
