"use client";

import Cookies from "js-cookie";

const token = Cookies.get("Authorization");

export const productLists = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_URL}/api/products/lists`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const productDetail = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_URL}/api/products/list/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const productCreate = async (body: {
  name: string;
  description: string;
  price: number;
  stock: number;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_URL}/api/products/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const productDelete = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_URL}/api/products/soft-delete/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response, "response");

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const productUpdate = async (body: {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}) => {
  try {
    const { id, ...res } = body;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_URL}/api/products/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...res }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
