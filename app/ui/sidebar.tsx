"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  PlusIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { logout } from "@/app/lib/auth-action";

export default function Sidebar({ role, user }: any) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isArtisan = role === "artisan";

  const artisanLinks = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "My Products", href: "/dashboard/products", icon: ShoppingBagIcon },
    { name: "Add Product", href: "/dashboard/products/new", icon: PlusIcon },
  ];

  const buyerLinks = [
    { name: "Marketplace", href: "/marketplace", icon: HomeIcon },
    { name: "My Orders", href: "/marketplace/orders", icon: ShoppingBagIcon },
    { name: "Account", href: "/marketplace/account", icon: UserIcon },
  ];

  const links = isArtisan ? artisanLinks : buyerLinks;

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={clsx(
          "fixed md:sticky md:top-0 z-50 md:z-0",
          "w-64 min-h-screen bg-white border-r",
          "px-4 py-6 flex flex-col",
          "transition-transform duration-300",
          {
            "-translate-x-full md:translate-x-0": !open,
            "translate-x-0": open,
          }
        )}
      >
        {/* CLOSE (mobile) */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <XMarkIcon className="w-6" />
          </button>
        </div>

        {/* LOGO */}
        <Link
          href={isArtisan ? "/dashboard" : "/marketplace"}
          className="mb-8 flex justify-center"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden border shadow-sm">
            <Image
              src="/craftoraLogo.png"
              alt="Craftora"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* NAV */}
        <nav className="flex flex-col gap-1 text-sm">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition",
                  "hover:bg-gray-100",
                  {
                    "bg-sky-100 text-blue-600 font-medium":
                      pathname === link.href,
                    "text-gray-600": pathname !== link.href,
                  }
                )}
              >
                <Icon className="w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* USER + LOGOUT */}
        <div className="mt-auto pt-6 border-t">

          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <p className="text-xs text-green-600 mt-1">
              {isArtisan ? "Artisan" : "Buyer"}
            </p>
          </div>

          {/* LOGOUT */}
          <form action={logout} className="mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
            >
              <ArrowRightStartOnRectangleIcon className="w-5" />
              Logout
            </button>
          </form>

        </div>
      </aside>
    </>
  );
}