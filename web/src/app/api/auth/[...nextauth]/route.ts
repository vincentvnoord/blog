import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const githubProfile = profile as { login?: string };
      return githubProfile?.login === process.env.ALLOWED_GITHUB_USERNAME;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.login as string;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        const githubProfile = profile as { login?: string };
        token.login = githubProfile.login;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

