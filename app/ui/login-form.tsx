'use client';

import { useActionState, useEffect } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { authenticate } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [result, formAction, isPending] = useActionState(
    authenticate,
    null
  );

   // ✅ handle redirect AFTER successful login
  useEffect(() => {
    if (result?.success) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1500); // small UX delay

      return () => clearTimeout(timer);
    }
  }, [result, router]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg bg-gray-100 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-semibold text-blue-900">
          Login to Craftora
        </h1>

        {/* EMAIL */}
        <div className="mt-4">
          <label 
            className="mb-2 block text-sm font-medium"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="peer w-full border py-2 pl-10 pr-3 rounded"
              required
            />
            <AtSymbolIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-700" />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mt-4">
          <label 
            className="mb-2 block text-sm font-medium" 
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              className="peer w-full border py-2 pl-10 pr-3 rounded"
              required
              minLength={6}
            />
            <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-700" />
          </div>
        </div>

         {/* BUTTON */}
        <button
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center hover:bg-blue-700 transition"
          disabled={isPending}
        >
        {isPending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
            "Log in"
        )}
          <ArrowRightIcon className="ml-4 h-5 w-5 text-gray-50" />
        </button>

        {/* ERROR */}
        {result && (
            <div
                className={`flex items-center gap-2 mt-3 ${
                result.success ? 'text-green-500' : 'text-red-500'
                }`}
            >
                {result.success ? (
                <CheckCircleIcon className="h-5 w-5" />
                ) : (
                <ExclamationCircleIcon className="h-5 w-5" />
                )}

                <p className="text-sm">{result.message}</p>
            </div>
            )}
    </div>
    </form>
  );
}