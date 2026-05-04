import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: "BUYER" | "ARTISAN";
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "BUYER" | "ARTISAN";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "BUYER" | "ARTISAN";
  }
}