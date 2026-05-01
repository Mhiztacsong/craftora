'use client';

import { useActionState } from 'react';
import { createUser } from '@/app/lib/actions';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function SignupForm() {
  const [result, formAction, isPending] = useActionState(
    createUser,
    null
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg bg-gray-100 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl font-semibold text-blue-900">
          Create an account
        </h1>

        {/* NAME */}
        <div className="mt-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter your name"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mt-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
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
            htmlFor="password"
            className="mb-2 block text-sm font-medium"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="peer w-full border py-2 pl-10 pr-3 rounded"
              required
            />
            <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-gray-700" />
          </div>
        </div>

        {/* ROLE */}
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Account Type
          </label>
          <select
            name="role"
            className="w-full border p-2 rounded"
          >
            <option value="BUYER">Buyer</option>
            <option value="ARTISAN">Artisan</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Sign Up'}
        </button>

         {/* MESSAGE (SUCCESS + ERROR HANDLING) */}
        {result && (
          <div
            className={`flex items-center gap-2 mt-2 ${
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