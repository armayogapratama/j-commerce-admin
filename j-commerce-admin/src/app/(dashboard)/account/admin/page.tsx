"use client";

import { columnUsers } from "@/components/layouts/colums/userColums";
import DataTable from "@/components/layouts/tables";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  adminInvitation,
  userByRole,
} from "@/stores/instances/authInstance/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => userByRole("admin"),
  });
  const users = data?.data;

  const createMutation = useMutation({
    mutationFn: (email: string) => adminInvitation(email),
    onSuccess: (data) => {
      if (data.status == "Success") {
        toast.success(data.message);
        setIsDialogOpen(false);
        refetch();
      }
    },
  });

  const handleEmailCreate = async () => {
    try {
      const response = await createMutation.mutateAsync(email);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="pl-24 pr-6">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row justify-between items-center border-b border-neutral-400 py-5">
          <p className="font-semibold text-[14px]">Data Admin</p>

          <p className="text-[12px] text-neutral-400">Data Admin</p>
        </div>

        <div className="w-full flex flex-col gap-y-8">
          <div className="w-full flex flex-row justify-end">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger
                onClick={() => setIsDialogOpen(true)}
                className="w-3/12 bg-orange-500 h-10 text-white hover:bg-orange-600 cursor-pointer rounded-md border border-orange-500">
                Send Invitation
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white rounded-md w-full verticalScroll max-h-[800px] max-w-[400px] md:max-w-[600px] flex flex-col py-8 px-0">
                <div className="w-full flex flex-row items-center pb-2 px-3">
                  <div className="w-full flex flex-col items-center justify-center gap-y-1 px-3">
                    <AlertDialogTitle className="font-semibold text-[20px]">
                      Masukkan Email Yang akan ditambahkan
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-[14px] text-center">
                      Periksa kembali dengan teliti saat mengisi data.
                    </AlertDialogDescription>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-y-5 px-3">
                  <div className="w-full flex flex-col gap-y-1">
                    <Label className="text-[14px] text-neutral-90">Email</Label>

                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Masukkan Email Pengguna"
                      className="w-full h-10 placeholder:opacity-30 border border-neutral-40 rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-y-1 px-3">
                    <AlertDialogHeader className="w-full flex flex-col gap-y-5 px-3 py-2">
                      <AlertDialogFooter className="w-full flex flex-row items-center gap-x-3 justify-end">
                        <AlertDialogCancel
                          onClick={() => setIsDialogOpen(false)}
                          className="mt-0 w-4/12 md:w-[28%] border border-neutral-40 px-2">
                          Batalkan
                        </AlertDialogCancel>

                        <Button
                          onClick={handleEmailCreate}
                          disabled={createMutation.isPending}
                          className="bg-primary-40 cursor-pointer hover:bg-primary-50 text-white w-4/12 md:w-[28%]">
                          {createMutation.isPending ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Kirim"
                          )}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogHeader>
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="w-full">
            {users && (
              <DataTable
                data={users}
                columns={columnUsers}
                hiddenColumns={[""]}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
