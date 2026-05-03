import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import {
  HomeIcon,
  ShoppingBagIcon,
  PlusIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userName = session?.user?.name || "Artisan";
  const userEmail = session?.user?.email;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r px-5 py-6 shadow-sm">

        {/* BRAND */}
        <Link href="/dashboard" className="mb-10 flex justify-center">
            <div className="p-1 rounded-full bg-gray-400">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                    <Image
                        src="/craftoraLogo.png"
                        alt="Craftora Logo"
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </Link>

        {/* NAV */}
        <nav className="flex flex-col gap-2 text-sm">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <HomeIcon className="w-5" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/products"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <ShoppingBagIcon className="w-5" />
            My Products
          </Link>

          <Link
            href="/dashboard/products/new"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <PlusIcon className="w-5" />
            Add Product
          </Link>
        </nav>

        {/* USER */}
        <div className="mt-auto pt-6 border-t">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-sm">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>

          <form
            className="mt-4"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit" className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
              <ArrowRightStartOnRectangleIcon className="w-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">

          {/* MOBILE MENU */}
          <div className="flex items-center gap-2 md:hidden">
            <Bars3Icon className="w-6" />
            <span className="font-bold text-lg">Craftora</span>
          </div>

          {/* DESKTOP USER GREETING */}
          <div className="hidden md:block text-sm text-gray-600">
            Welcome back, <span className="font-medium">{userName}</span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}