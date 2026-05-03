import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import {
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craftora",
  description: "Manage your crafts and inventory with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">

        {/* NAVBAR */}
        <header className="bg-gray-300 border-b sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Craftora
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-black transition"
              >
                Login
                <ArrowRightEndOnRectangleIcon className="w-5" />
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign up
                <UserPlusIcon className="w-5" />
              </Link>
            </div>
          </nav>
        </header>

        {/* IMPORTANT: NO max-width here */}
        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}