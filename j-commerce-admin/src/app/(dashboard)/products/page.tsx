"use client";

import { columnProducts } from "@/components/layouts/colums/productColums";
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
import { Textarea } from "@/components/ui/textarea";
import {
  productCreate,
  productLists,
} from "@/stores/instances/productInstance/api";
import { ProductInterface } from "@/stores/instances/productInstance/interface";
import { ApiResponse, DataObject } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProductPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [created, setCreated] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: productLists,
  });
  const products = data?.data;

  const createMutation = useMutation({
    mutationFn: (body: {
      name: string;
      description: string;
      price: number;
      stock: number;
    }) => productCreate(body),
    onSuccess: (data: ApiResponse<DataObject<ProductInterface>>) => {
      if (data.status == "Success") {
        toast.success(data.message);
        setIsDialogOpen(false);
        refetch();
      }
    },
  });

  const handleProductCreate = async () => {
    try {
      const response = await createMutation.mutateAsync({
        name: created.name,
        description: created.description,
        price: Number(created.price),
        stock: Number(created.stock),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="pl-24 pr-6">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-row justify-between items-center border-b border-neutral-400 py-5">
          <p className="font-semibold text-[14px]">Data Products</p>

          <p className="text-[12px] text-neutral-400">Data Products</p>
        </div>

        <div className="w-full flex flex-col gap-y-8">
          <div className="w-full flex flex-row justify-end">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger
                onClick={() => setIsDialogOpen(true)}
                className="w-3/12 bg-orange-500 h-10 text-white hover:bg-orange-600 cursor-pointer rounded-md border border-orange-500">
                Create
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white rounded-md w-full verticalScroll max-h-[800px] max-w-[400px] md:max-w-[600px] flex flex-col py-8 px-0">
                <div className="w-full flex flex-row items-center pb-2 px-3">
                  <div className="w-full flex flex-col items-center justify-center gap-y-1 px-3">
                    <AlertDialogTitle className="font-semibold text-[20px]">
                      Masukkan Data Yang akan ditambahkan
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-[14px] text-center">
                      Periksa kembali dengan teliti saat mengisi data.
                    </AlertDialogDescription>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-y-5 px-3">
                  <div className="w-full flex flex-col gap-y-1">
                    <Label className="text-[14px] text-neutral-90">
                      Nama Product
                    </Label>

                    <Input
                      type="text"
                      name="name"
                      value={created.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCreated({ ...created, name: e.target.value })
                      }
                      placeholder="Masukkan Nama Product"
                      className="w-full h-10 placeholder:opacity-30 border border-neutral-40 rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-y-1">
                    <Label className="text-[14px] text-neutral-90">
                      Harga Product
                    </Label>

                    <Input
                      type="number"
                      name="price"
                      value={created.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCreated({ ...created, price: e.target.value })
                      }
                      placeholder="Masukkan Harga Product"
                      className="w-full h-10 placeholder:opacity-30 border border-neutral-40 rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-y-1">
                    <Label className="text-[14px] text-neutral-90">
                      Stock Product
                    </Label>

                    <Input
                      type="number"
                      name="stock"
                      value={created.stock}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCreated({ ...created, stock: e.target.value })
                      }
                      placeholder="Masukkan Jumlah Stock Product"
                      className="w-full h-10 placeholder:opacity-30 border border-neutral-40 rounded-md px-3 py-2"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-y-1">
                    <Label className="text-[14px] text-neutral-90">
                      Deskripsi Product
                    </Label>

                    <Textarea
                      name="additional_info"
                      value={created.description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setCreated({
                          ...created,
                          description: e.target.value,
                        })
                      }
                      placeholder="Masukkan Deskripsi Product"
                      className="w-full h-48 placeholder:opacity-30 border border-neutral-40 rounded-md px-3 py-2"
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
                          onClick={handleProductCreate}
                          disabled={createMutation.isPending}
                          className="bg-primary-40 cursor-pointer hover:bg-primary-50 text-white w-4/12 md:w-[28%]">
                          {createMutation.isPending ? (
                            <Loader className="animate-spin" />
                          ) : (
                            "Create"
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
            {products && (
              <DataTable
                data={products}
                columns={columnProducts}
                hiddenColumns={["description"]}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
