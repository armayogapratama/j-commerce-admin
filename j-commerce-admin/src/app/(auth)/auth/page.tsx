"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import LoginPage from "@/components/elements/auth/login";
import RegisterPage from "@/components/elements/auth/register";

export default function AuthenticationPage() {
  const searchParams = useSearchParams();
  const searchTabs = searchParams.get("tabs");
  const [isTabs, setIsTabs] = useState<string>("register");

  useEffect(() => {
    if (searchTabs == "login") {
      setIsTabs("login");
    } else if (searchTabs == "register") {
      setIsTabs("register");
    }
  }, [searchTabs]);

  return (
    <section className="w-screen h-screen flex flex-row justify-center items-center">
      <div
        className={`w-4/12 ${
          isTabs == "register"
            ? "min-h-[600px] max-h-[600px]"
            : "min-h-[480px] max-h-[480px]"
        } bg-white mx-auto border border-neutral-400 rounded-md shadow-md p-5`}>
        <Tabs
          value={isTabs ? isTabs : "register"}
          onValueChange={(value) => setIsTabs(value)}
          className="w-full flex flex-col justify-center items-center">
          <TabsList className="w-full flex flex-row">
            <TabsTrigger
              value="register"
              className="w-full bg-neutral-30 data-[state=active]:shadow-md data-[state=active]:bg-primary-40 data-[state=active]:text-white">
              Register
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="w-full bg-neutral-30 data-[state=active]:shadow-md data-[state=active]:bg-primary-40 data-[state=active]:text-white">
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="register" className="w-full flex flex-col">
            <RegisterPage />
          </TabsContent>
          <TabsContent value="login" className="w-full flex flex-col">
            <LoginPage />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
