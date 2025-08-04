"use client";

import { columnUsers } from "@/components/layouts/colums/userColums";
import DataTable from "@/components/layouts/tables";
import { userByRole } from "@/stores/instances/authInstance/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function UserPage() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => userByRole("buyer"),
  });
  const users = data?.data;

  return (
    <section className="pl-24 pr-6">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row justify-between items-center border-b border-neutral-400 py-5">
          <p className="font-semibold text-[14px]">Data Users</p>

          <p className="text-[12px] text-neutral-400">Data Users</p>
        </div>

        <div className="w-full flex flex-col gap-y-8">
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
