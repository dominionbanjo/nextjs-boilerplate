import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import type { Session } from "next-auth";

/**
 * Verifies a valid NextAuth session exists for the current request.
 *
 * @returns `{ session }` on success, or a `{ response }` containing a 401 JSON
 *           response that the route handler should return immediately.
 */
export async function requireSession(req?: Request, explicitToken?: string): Promise<
  | { session: Session; response?: never }
  | { response: NextResponse; session?: never }
> {
  const session = await getServerSession(authOptions);

  if (!session || !session.tokens?.access) {
    return {
      response: NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      ),
    };
  }

  if (req) {
    let token = explicitToken;
    if (!token) {
      const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");
      if (authHeader) {
        token = authHeader.replace(/^Bearer\s+/i, "").trim();
      }
    }

    if (!token) {
      return {
        response: NextResponse.json(
          { error: "Authorization token is missing" },
          { status: 401 },
        ),
      };
    }

    if (token !== session.tokens.access) {
      return {
        response: NextResponse.json(
          { error: "Invalid authorization token" },
          { status: 401 },
        ),
      };
    }
  }

  return { session };
}
