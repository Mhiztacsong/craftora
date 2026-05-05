import { prisma } from "@/app/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <img
              src={product.imageUrl || ""}
              alt={product.title}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-3">
              {product.title}
            </h2>

            <p className="text-sm text-gray-600">
              {product.description.slice(0, 80)}...
            </p>

            <p className="mt-2 font-bold">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              by {product.user.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}