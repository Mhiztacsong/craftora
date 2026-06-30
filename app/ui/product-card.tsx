import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string | null;
    user: {
      name: string | null;
    };
  };
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-sm transition hover:shadow-md">
      {product.imageUrl ? (
        <div className="relative h-56 w-full">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-56 items-center justify-center bg-gray-200">
          <span className="text-sm text-gray-500">
            No Image Available
          </span>
        </div>
      )}

      <div className="flex h-[220px] flex-col p-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">
            {product.title}
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {product.description.length > 80
              ? `${product.description.slice(0, 80)}...`
              : product.description}
          </p>

          <p className="mt-4 text-xl font-bold">
            ₦{product.price.toLocaleString()}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            by {product.user.name ?? "Unknown Artisan"}
          </p>
        </div>

        <Link
          href={`/marketplace/${product.id}`}
          className="mt-5 block rounded-lg bg-black py-2 text-center text-white transition hover:bg-gray-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}