import SignupForm from '@/app/ui/signup-form';

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4">
        <SignupForm />
      </div>
    </main>
  );
}