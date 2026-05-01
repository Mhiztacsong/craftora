import { signOut } from '@/auth';
import { ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back 👋 Manage your crafts easily.
          </p>
        </div>

        {/* SIGN OUT */}
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            <ArrowRightStartOnRectangleIcon className="w-5" />
            Sign Out
          </button>
        </form>
      </div>

      {/* STATS SECTION */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500">Total Products</h3>
          <p className="text-2xl font-semibold mt-2">0</p>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500">Orders</h3>
          <p className="text-2xl font-semibold mt-2">0</p>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <h3 className="text-sm text-gray-500">Revenue</h3>
          <p className="text-2xl font-semibold mt-2">₦0</p>
        </div>

      </div>

      {/* QUICK ACTION */}
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <p className="text-gray-600 mb-4">
          Start by adding your first product to Craftora.
        </p>

        <button className="bg-black text-white px-4 py-2 rounded-md hover:opacity-90 transition">
          Add Product
        </button>
      </div>

    </div>
  );
}