import Image from "next/image";

type ProductDetailsProps = {
  product: {
    title: string;
    description: string;
    price: number;
    imageUrl: string | null;
    createdAt: Date;
    user: {
      name: string | null;
    };
  };
};

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Product Image */}
      <div>
        {product.imageUrl ? (
          <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-[500px] items-center justify-center rounded-xl bg-gray-200">
            <span className="text-gray-500">
              No Image Available
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">
          {product.title}
        </h1>

        <p className="text-3xl font-semibold">
          ₦{product.price.toLocaleString()}
        </p>

        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-medium text-black">
              Artisan:
            </span>{" "}
            {product.user.name ?? "Unknown Artisan"}
          </p>

          <p>
            <span className="font-medium text-black">
              Listed:
            </span>{" "}
            {product.createdAt.toLocaleDateString()}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Description
          </h2>

          <p className="leading-7 text-gray-700">
            {product.description}
          </p>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            disabled
            className="cursor-pointer rounded-lg border px-5 py-3 text-gray-400"
          >
            ♡ Add to Wishlist
          </button>

          <button
            disabled
            className="cursor-pointer rounded-lg bg-black px-5 py-3 text-white opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}