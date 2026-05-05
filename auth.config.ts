import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = !!user;
      const pathname = nextUrl.pathname;

      const isDashboard = pathname.startsWith("/dashboard");
      const isMarketplace = pathname.startsWith("/marketplace");

      // 🚫 Not logged in
      if (!isLoggedIn) {
        return !(isDashboard || isMarketplace);
      }

      const role = user.role as "BUYER" | "ARTISAN";

      // 👨‍🎨 ARTISAN
      if (role === "ARTISAN") {
        if (isMarketplace) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      // 🛒 BUYER
      if (role === "BUYER") {
        if (isDashboard) {
          return Response.redirect(new URL("/marketplace", nextUrl));
        }
        return true;
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;