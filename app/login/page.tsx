import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-4 p-4">
        {/* <div className="h-20 bg-black rounded flex items-center justify-center">
          <h1 className="text-white text-xl font-bold">Craftora</h1>
        </div> */}

        <LoginForm />
      </div>
    </main>
  );
}