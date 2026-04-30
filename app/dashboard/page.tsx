import { signOut } from '@/auth';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to Craftora dashboard 🚀</p>

      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button
            type="submit"
            className="flex items-center gap-2 bg-red-500 text-white p-2 rounded"
        >
          <PowerIcon className="w-5" />
          Sign Out
        </button>
      </form>


    </main>
  );
}

