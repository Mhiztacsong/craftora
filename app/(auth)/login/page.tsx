import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="w-full max-w-md space-y-4">
        <LoginForm />
      </div>
    </div>
  );
}