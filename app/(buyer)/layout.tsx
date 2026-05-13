import { auth } from "@/auth";
import BuyerLayoutClient from "@/app/ui/buyerLayoutClient";

export default async function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userName = session?.user?.name || "Guest";
  const userEmail = session?.user?.email;

  return (
    <BuyerLayoutClient
      userName={userName}
      userEmail={userEmail}
    >
      {children}
    </BuyerLayoutClient>
  );
}