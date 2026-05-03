import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function DashboardProductsPage() {
  // 1. Get session
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2. Get user from DB
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // 3. Get ONLY this user's products
  const products = await prisma.product.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      {/* BREADCRUMBS */}
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Products",
            href: "/dashboard/products",
            active: true,
          },
        ]}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>

        <Link
          href="/dashboard/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <p className="text-gray-500">
          You have not added any products yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* IMAGE */}
              <img
                src={product.imageUrl || "/placeholder.png"}
                alt={product.title}
                className="w-full h-48 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-600">
                  {product.description.slice(0, 80)}...
                </p>

                {/* PRICE + ACTIONS */}
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold">
                    ₦{product.price.toLocaleString()}
                  </span>

                  <div className="flex gap-3 text-sm">
                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}