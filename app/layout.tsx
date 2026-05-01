import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ArrowRightEndOnRectangleIcon, UserPlusIcon} from "@heroicons/react/24/outline";

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
      <body className="min-h-full flex flex-col">
        
        {/* ✅ NAVBAR (this was missing) */}
        <header className="bg-black/90 backdrop-blur border-b sticky top-0 z-50 p-4">
          <nav className="max-w-6xl mx-auto flex items-center justify-between p-1">
            
            <Link href="/" className="text-4xl font-bold text-blue-600 ">
              Craftora
            </Link>

            <div className="flex items-center gap-1">
              <Link href="/login" className="text-white hover:text-gray-300 transition">
                Login

                <ArrowRightEndOnRectangleIcon className="inline-block w-5 h-6 ml-1" />
              </Link>

              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign up

                <UserPlusIcon className="inline-block w-5 h-6 ml-1" />
              </Link>
            </div>
          </nav>
        </header>

        {/* ✅ MAIN CONTENT WRAPPER */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-1 mt-10">
          {children}
        </main>

      </body>
    </html>
  );
}