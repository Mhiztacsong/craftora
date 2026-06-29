import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/app/ui/edit-product-form";



type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
        id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-xl">
        <EditProductForm product={product} />
    </div>
);
}