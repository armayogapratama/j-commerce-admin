"use client";

import Cookies from "js-cookie";

const token = Cookies.get("Authorization");
export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USER_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const registerAdmin = async (
  email: string,
  password: string,
  name: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USER_URL}/api/users/register-admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, token }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const adminInvitation = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INVITATION_URL}/api/invitations/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const userByRole = async (role: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USER_URL}/api/users/user-role/${role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
