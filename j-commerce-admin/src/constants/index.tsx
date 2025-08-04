import { sidebarItemsTypes } from "@/types";
import { LayoutDashboard, ShoppingCart, Users2 } from "lucide-react";

export const sidebarItems: sidebarItemsTypes[] = [
  {
    label: "Dashboard",
    icon: (
      <LayoutDashboard className="w-5 h-5 group-hover/link:text-white text-primary-40" />
    ),
    key: "dashboard",
    link: "/dashboard",
    hasDropdown: false,
  },
  {
    label: "Product Lists",
    icon: (
      <ShoppingCart className="w-5 h-5 group-hover/link:text-white text-primary-40" />
    ),
    key: "product",
    link: "/products",
    hasDropdown: false,
  },
  {
    label: "Accounts",
    icon: (
      <Users2 className="w-5 h-5 group-hover/link:text-white text-primary-40" />
    ),
    key: "accounts",
    hasDropdown: true,
    subItems: [
      {
        label: "Admin",
        key: "admin",
        link: "/account/admin",
      },
      {
        label: "User",
        key: "user",
        link: "/account/user",
      },
    ],
  },
];
