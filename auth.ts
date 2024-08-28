import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [github],
  callbacks: {
    authorized: async ({ auth, request }) => {
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard && !auth)
        return NextResponse.redirect(new URL("/", request.url));

      return true;
    },
    jwt({ token, account }) {
      if (account) token.id = account.providerAccountId;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },
});
