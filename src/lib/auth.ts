import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type {
  AuthUser,
  AuthTokens,
} from "@/types/next-auth";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

// ─── Backend response shape ────────────────────────────────────────────────────

interface BackendAuthData {
  user: AuthUser;
  tokens: AuthTokens;
}

interface BackendAuthResponse {
  success: boolean;
  data: BackendAuthData;
  message?: string;
  error?: string;
}

// ─── NextAuth options ─────────────────────────────────────────────────────────

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;

        const { email, password } = credentials;

        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        let data: BackendAuthResponse;
        try {
          data = await res.json();
        } catch {
          throw new Error("Invalid response received from authentication server.");
        }

        if (!res.ok) {
          throw new Error(
            data.message || data.error || "Authentication failed",
          );
        }

        if (data?.success && data?.data) {
          const authData = data.data;

          return {
            id: authData.user?.id || authData.user?.email || "user",
            user: authData.user,
            tokens: authData.tokens,
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as User;
        token.user = u.user;
        token.tokens = u.tokens;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.tokens = token.tokens;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};
