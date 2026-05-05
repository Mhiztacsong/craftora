import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import {
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default async function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userName = session?.user?.name || "Guest";
  const userEmail = session?.user?.email;

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r px-4 py-6">

        {/* LOGO */}
        <Link href="/marketplace" className="mb-8 flex justify-center">
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

          <Link
            href="/marketplace"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <HomeIcon className="w-5" />
            Marketplace
          </Link>

          <Link
            href="/marketplace/orders"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <ShoppingBagIcon className="w-5" />
            My Orders
          </Link>

          <Link
            href="/marketplace/account"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
          >
            <UserIcon className="w-5" />
            Account
          </Link>
        </nav>

        {/* USER */}
        <div className="mt-auto pt-6 border-t">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-medium text-sm">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
            <p className="text-xs text-green-600 mt-1">Buyer</p>
          </div>

          <form
            className="mt-4"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
              <ArrowRightStartOnRectangleIcon className="w-5" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-4">

          <div className="flex items-center gap-3 md:hidden">
            <Bars3Icon className="w-6" />
            <span className="font-semibold">Craftora</span>
          </div>

          <div className="hidden md:block text-sm text-gray-600">
            Welcome to the marketplace,{" "}
            <span className="font-medium text-black">{userName}</span>
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