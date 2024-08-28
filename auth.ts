import NextAuth from "next-auth";
import github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [github],
  callbacks: {
    authorized: async ({ auth, request }) => {
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) return !!auth;

      return true;
    },
    jwt({ token, account }) {
      if (account) 
        token.id = account.providerAccountId;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
