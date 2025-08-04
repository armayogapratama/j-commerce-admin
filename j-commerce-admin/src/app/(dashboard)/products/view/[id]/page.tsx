"use client";

import CompoundCard from "@/components/elements/auth/compound";
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
  productDelete,
  productDetail,
  productUpdate,
} from "@/stores/instances/productInstance/api";
import { ProductInterface } from "@/stores/instances/productInstance/interface";
import { ApiResponse, DataObject } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProductViewPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updated, setUpdated] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const { data, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productDetail(id),
  });
  const product = data?.data as ProductInterface;

  useEffect(() => {
    if (product) {
      setUpdated({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
      });
    }
  }, [product]);

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => productDelete(id),
    onSuccess: (data: ApiResponse<DataObject<ProductInterface>>) => {
      if (data.status == "Success") {
        toast.success(data.message);
        router.push("/products");
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (body: {
      id: number;
      name: string;
      description: string;
      price: number;
      stock: number;
    }) => productUpdate(body),
    onSuccess: (data: ApiResponse<DataObject<ProductInterface>>) => {
      if (data.status == "Success") {
        toast.success(data.message);
        setIsDialogOpen(false);
        refetch();
      }
    },
  });

  const handleProductDelete = async (id: number) => {
    try {
      const response = await deleteMutation.mutateAsync(id);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductUpdate = async () => {
    try {
      const response = await updateMutation.mutateAsync({
        id: id,
        name: updated.name,
        description: updated.description,
        price: Number(updated.price),
        stock: Number(updated.stock),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="pl-24 pr-6">
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex flex-col items-center justify-center py-8 gap-y-5 px-4">
          <div className="w-full flex flex-row items-center justify-between">
            <h2 className="text-[20px] w-full font-semibold text-start text-black">
              Detail Product
            </h2>

            <div className="w-10/12 flex flex-row gap-x-3 justify-end">
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger
                  onClick={() => setIsDialogOpen(true)}
                  className="w-3/12 bg-orange-500 h-10 text-white hover:bg-orange-600 cursor-pointer rounded-md border border-orange-500">
                  Update
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white rounded-md w-full verticalScroll max-h-[800px] max-w-[400px] md:max-w-[600px] flex flex-col py-8 px-0">
                  <div className="w-full flex flex-row items-center pb-2 px-3">
                    <div className="w-full flex flex-col items-center justify-center gap-y-1 px-3">
                      <AlertDialogTitle className="font-semibold text-[20px]">
                        Masukkan Data Yang akan diupdate
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
                        value={updated.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUpdated({ ...updated, name: e.target.value })
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
                        value={updated.price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUpdated({ ...updated, price: e.target.value })
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
                        value={updated.stock}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUpdated({ ...updated, stock: e.target.value })
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
                        value={updated.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setUpdated({
                            ...updated,
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
                            onClick={handleProductUpdate}
                            disabled={updateMutation.isPending}
                            className="bg-primary-40 cursor-pointer hover:bg-primary-50 text-white w-4/12 md:w-[28%]">
                            {updateMutation.isPending ? (
                              <Loader className="animate-spin" />
                            ) : (
                              "Update"
                            )}
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogHeader>
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>

              {product?.status == true && (
                <div className="w-3/12">
                  <Button
                    disabled={deleteMutation.isPending}
                    onClick={() => handleProductDelete(id)}
                    className="w-full h-10 bg-error-30 text-white hover:bg-error-40 cursor-pointer rounded-md border border-error-30">
                    {deleteMutation.isPending ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full rounded-md flex flex-col bg-white">
            <div className="w-full flex flex-col gap-y-5">
              <div className="w-full flex flex-col divide-y bg-white shadow-md border border-neutral-50 rounded-md p-3 mt-5">
                <div className="w-full flex flex-col items-center justify-between py-3 gap-y-4">
                  <h6 className="w-full font-semibold text-[18px]">
                    Information of Summary
                  </h6>

                  <div className="w-full flex flex-col gap-y-1">
                    <CompoundCard value={product?.name} title="Product Name" />
                    <CompoundCard
                      value={product?.price}
                      title="Product Price"
                    />
                    <CompoundCard
                      value={product?.stock}
                      title="Product Stock"
                    />
                    <CompoundCard
                      value={product?.description}
                      title="Product Description"
                    />

                    <CompoundCard
                      value={product?.status ? "Active" : "Inactive"}
                      title="Product Status"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
