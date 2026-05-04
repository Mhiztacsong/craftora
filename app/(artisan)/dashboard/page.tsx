import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/auth";
import {
  ArrowRightStartOnRectangleIcon,
  CubeIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default async function DashboardPage() {
  // 1. Auth check
  const session = await auth();

  if (!session) redirect("/login");

  if (session.user.role !== "ARTISAN") {
    redirect("/products");
  }

  // 2. Get user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/login");

  // 3. Fetch stats
  const totalProducts = await prisma.product.count({
    where: { userId: user.id },
  });

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back 👋 Manage your crafts and grow your business.
          </p>
        </div>

        {/* SIGN OUT */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            <ArrowRightStartOnRectangleIcon className="w-5" />
            Sign Out
          </button>
        </form>
      </div>

      {/* STATS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <CubeIcon className="w-5" />
            <h3 className="text-sm">Total Products</h3>
          </div>
          <p className="text-3xl font-semibold mt-3">{totalProducts}</p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <ShoppingBagIcon className="w-5" />
            <h3 className="text-sm">Orders</h3>
          </div>
          <p className="text-3xl font-semibold mt-3">0</p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <BanknotesIcon className="w-5" />
            <h3 className="text-sm">Revenue</h3>
          </div>
          <p className="text-3xl font-semibold mt-3">₦0</p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="p-6 bg-white border rounded-xl shadow-sm">

        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>

        <p className="text-gray-600 mb-4">
          Start by adding a new product to your store.
        </p>

        <Link
          href="/dashboard/products/new"
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:opacity-90 transition"
        >
          <PlusIcon className="w-5" />
          Add Product
        </Link>

      </div>

    </div>
  );
}