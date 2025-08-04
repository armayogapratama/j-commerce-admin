"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Loader, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Lock } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "@/stores/instances/authInstance/api";
import { ApiResponse, DataObject } from "@/types";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      adminLogin(email, password),
    onSuccess: (data: ApiResponse<DataObject<string>>) => {
      if (data.status == "Success") {
        toast.success(data.message);
        Cookies.set("Authorization", data.data);
        router.push("/dashboard");
      }
    },
    onMutate: () => {
      toast.loading("Loading...");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginMutation.mutateAsync(user);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-5">
      <div className="flex flex-col w-full">
        <h2 className="text-[22px] text-center bg-gradient-to-r from-[#A710F7] to-[#0BF7CD] inline-block text-transparent bg-clip-text">
          Selamat datang di Jcommerce
        </h2>
        <p className="text-[16px] text-center">Halaman Login JCommerce</p>
      </div>
      {/* start */}
      <div className="w-full flex flex-col gap-y-3 p-6">
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-y-3">
          <div className="w-full grid grid-rows-2 gap-y-5">
            <div className="w-full flex flex-col gap-y-2">
              <div className="w-full flex flex-row items-center gap-x-2 bg-neutral-20 rounded-md p-2">
                <Mail className="w-5 h-5 text-primary-40" />
                <div className="w-full">
                  <Input
                    type="text"
                    name="email"
                    value={user?.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="placeholder:opacity-20"
                    placeholder="Email"
                  />
                </div>
              </div>
              {/* {errors.credentials && (
                      <p className="text-error-30 text-[14px]">
                        {errors.credentials}
                      </p>
                    )} */}
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <div className="w-full flex flex-row items-center gap-x-2 bg-neutral-20 rounded-md p-2">
                <Lock className="w-5 h-5 text-primary-40" />
                <div className="w-full flex flex-row gap-x-1 items-center justify-between">
                  <Input
                    type={!seen ? "text" : "password"}
                    name="password"
                    value={user?.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    autoComplete="off"
                    className="placeholder:opacity-20"
                    placeholder="Kata Sandi"
                  />
                  <div
                    onClick={() => setSeen(!seen)}
                    className="p-2 cursor-pointer">
                    {seen ? (
                      <EyeClosed className="text-neutral-50 w-[20px] h-[20px]" />
                    ) : (
                      <Eye className="text-neutral-50 w-[20px] h-[20px]" />
                    )}
                  </div>
                </div>
              </div>
              {/* {errors.password && (
                      <p className="text-error-30 text-[14px]">
                        {errors.password}
                      </p>
                    )} */}
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-2">
            <div className="flex flex-col w-full">
              <div
                // onClick={() => {
                //   router.push("/password/forget-password");
                //   setIsDialogOpenLogin(false);
                // }}
                className="font-normal text-primary-40 hover:font-semibold text-end text-[14px] cursor-pointer hover:text-primary-50">
                Lupa kata sandi?
              </div>
            </div>

            <Button
              disabled={loginMutation.isPending}
              type="submit"
              className="bg-primary-40 hover:bg-primary-50 text-white w-full">
              {loginMutation.isPending ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Masuk"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
