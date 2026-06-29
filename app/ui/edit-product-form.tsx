'use client';

import { useActionState, useEffect } from 'react';
import {
  PhotoIcon,
  CurrencyDollarIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { updateProduct } from '@/app/lib/actions';
import { useRouter } from "next/navigation"

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
};


export default function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
    
  const [result, formAction, isPending] = useActionState(
    updateProduct,
    null
  );

  useEffect(() => {
    if (result?.success) {
        setTimeout(() => {
            router.push("/dashboard/products");
        }, 1500);
    }
  }, [result, router]);

  return (
    <form action={formAction} className="space-y-3 p-2">

      <input
        type="hidden"
        name="id"
        value={product.id}
      />  
      
      <div className="rounded-lg bg-gray-100 px-6 pb-6 pt-8">
        
        <h1 className="mb-4 text-2xl font-semibold text-blue-900">
          Edit Product
        </h1>

        {/* TITLE */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative">
            <input
              name="title"
              required
              defaultValue={product.title}
              placeholder="Product name"
              className="peer w-full border py-2 pl-10 pr-3 rounded
              focus:bg-yellow-50 focus:border-blue-500 focus:outline-none transition"
            />
            <PencilSquareIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-blue-500" />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            required
            defaultValue={product.description}
            rows={4}
            className="w-full border py-2 px-3 rounded
            focus:bg-yellow-50 focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        {/* PRICE */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Price (₦)
          </label>
          <div className="relative">
            <input
              name="price"
              type="number"
              required
              placeholder="e.g. 15000"
              defaultValue={product.price}
              className="peer w-full border py-2 pl-10 pr-3 rounded
              focus:bg-yellow-50 focus:border-blue-500 focus:outline-none transition"
            />
            <CurrencyDollarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-blue-500" />
          </div>
        </div>

        {/* PRODUCT IMAGE */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Product Image
          </label>
          <div className="relative">
            <input
              type="file"
              name="image"
              accept="image/*"
              className="peer w-full border py-2 pl-10 pr-3 rounded
              focus:bg-yellow-50 focus:border-blue-500 focus:outline-none transition"
            />
            <PhotoIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-blue-500" />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full bg-blue-600 text-white p-2 rounded
          hover:bg-blue-700 transition flex items-center justify-center"
        >
          {isPending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Update Product"
          )}
        </button>

        {/* FEEDBACK */}
        {result && (
          <p className="text-sm mt-3 text-gray-600">
            {result.message}
          </p>
        )}
      </div>
    </form>
  );
}