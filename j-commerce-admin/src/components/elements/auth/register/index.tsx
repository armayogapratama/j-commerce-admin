"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Loader, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Lock } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { ApiResponse, DataObject } from "@/types";
import { UserInterface } from "@/stores/instances/authInstance/interface";
import { registerAdmin } from "@/stores/instances/authInstance/api";

export default function RegisterPage() {
  const router = useRouter();
  const [seen, setSeen] = useState(true);
  const [seen2, setSeen2] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });

  const registerMutation = useMutation({
    mutationFn: (user: {
      name: string;
      email: string;
      password: string;
      token: string;
    }) => registerAdmin(user.email, user.password, user.name, user.token),
    onSuccess: (data: ApiResponse<DataObject<UserInterface>>) => {
      if (data.status == "Success") {
        toast.success(data.message);
        router.push("/auth?tabs=login");
      }
    },
    onMutate: () => {
      toast.loading("Loading...");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const response = await registerMutation.mutateAsync(user);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-5">
      <div className="flex flex-col w-full">
        <h2 className="text-[22px] text-center bg-gradient-to-r from-[#A710F7] to-[#0BF7CD] inline-block text-transparent bg-clip-text">
          Selamat datang di JCOmmerce
        </h2>
        <p className="text-[16px] text-center">Halaman Daftar JCommerce</p>
      </div>
      {/* start */}
      <div className="w-full flex flex-col gap-y-3 p-6">
        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col gap-y-6">
          <div className="w-full grid grid-rows-2 gap-y-4">
            <div className="w-full flex flex-col gap-y-2">
              <div className="w-full flex flex-row items-center gap-x-2 bg-neutral-20 rounded-md p-2">
                <Mail className="w-5 h-5 text-primary-40" />
                <div className="w-full">
                  <Input
                    type="text"
                    name="name"
                    value={user?.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, name: e.target.value })
                    }
                    className="placeholder:opacity-20"
                    placeholder="Nama Lengkap"
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

            <div className="w-full flex flex-col gap-y-2">
              <div className="w-full flex flex-row items-center gap-x-2 bg-neutral-20 rounded-md p-2">
                <Lock className="w-5 h-5 text-primary-40" />
                <div className="w-full flex flex-row gap-x-1 items-center justify-between">
                  <Input
                    type={!seen2 ? "text" : "password"}
                    name="token"
                    value={user?.token}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, token: e.target.value })
                    }
                    autoComplete="off"
                    className="placeholder:opacity-20"
                    placeholder="Access Token"
                  />
                  <div
                    onClick={() => setSeen2(!seen2)}
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
            <Button
              disabled={registerMutation.isPending}
              type="submit"
              className="bg-primary-40 hover:bg-primary-50 text-white w-full">
              {registerMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Daftar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
