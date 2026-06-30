import { prisma } from "@/app/lib/prisma";
import ProductCard from "@/app/ui/product-card";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Marketplace
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}