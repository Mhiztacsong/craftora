import { prisma } from "@/app/lib/prisma";
import ProductDetails from "@/app/ui/product-details";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!product) {
    console.log("Product not found");
    notFound();
  }

  return (
    <div>
        <ProductDetails product={product} />
    </div>
  );
}