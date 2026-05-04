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

      // 🚫 Not logged in
      if (!isLoggedIn) {
        return !isDashboard; // allow public pages only
      }

      const role = user.role as "BUYER" | "ARTISAN";

      // 👨‍🎨 ARTISAN → full access
      if (role === "ARTISAN") {
        return true;
      }

      // 🛒 BUYER → BLOCK dashboard
      if (role === "BUYER" && isDashboard) {
        return Response.redirect(new URL("/products", nextUrl));
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;