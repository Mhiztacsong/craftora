"use client";

import { useState } from "react";
import Sidebar from "@/app/ui/sidebar";

export default function ArtisanLayoutClient({
  children,
  userName,
  userEmail,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">

      <Sidebar
        role="artisan"
        user={{ name: userName, email: userEmail }}
        open={open}
        setOpen={setOpen}
      />

      <div className="flex-1 flex flex-col">

        {/* TOPBAR (hamburger lives here) */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-4">

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          <div className="hidden md:block text-sm text-gray-600">
            Welcome back,{" "}
            <span className="font-medium text-black">{userName}</span>
          </div>

        </header>

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}