import { auth } from "@/auth";
import ArtisanLayoutClient from "@/app/ui/artisanLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userName = session?.user?.name || "Artisan";
  const userEmail = session?.user?.email;

  return (
    <ArtisanLayoutClient
      userName={userName}
      userEmail={userEmail}
    >
      {children}
    </ArtisanLayoutClient>
  );
}