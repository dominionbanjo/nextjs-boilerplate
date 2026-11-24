import { DefaultSession } from "next-auth";
import "next-auth/jwt";

// ─── Domain types ──────────────────────────────────────────────────────────────

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  type: "USER" | "ADMIN";
  profile_picture_url: string;
  is_email_verified: boolean;
  is_active: boolean;
}

// ─── NextAuth module augmentation ─────────────────────────────────────────────

declare module "next-auth" {
  interface Session {
    user: AuthUser & DefaultSession["user"];
    tokens: AuthTokens;
  }

  interface User {
    user: AuthUser;
    tokens: AuthTokens;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AuthUser;
    tokens: AuthTokens;
  }
}
