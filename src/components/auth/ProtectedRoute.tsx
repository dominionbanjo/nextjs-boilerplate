"use client";

import { ReactNode, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux";
import FullScreenLoader from "@/components/shared/ui/FullScreenLoader";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedTypes?: ("USER" | "ADMIN")[];
}

interface AccessUser {
  type: "USER" | "ADMIN";
}

function toAccessUser(value: unknown): AccessUser | undefined {
  if (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    typeof (value as { type?: unknown }).type === "string"
  ) {
    const type = (value as { type: AccessUser["type"] }).type;
    if (type === "USER" || type === "ADMIN") {
      return { type };
    }
  }
  return undefined;
}

export default function ProtectedRoute({
  children,
  allowedTypes,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { user, isAuthenticated, isRestored, isSynced } = useAppSelector(
    (state) => state.auth,
  );

  const redirectUnauthenticated = useCallback(() => {
    // General redirection for unauthenticated users
    router.push("/?login=1");
  }, [router]);

  const redirectBasedOnUser = useCallback((activeUser: AccessUser | undefined) => {
    if (!activeUser) {
      redirectUnauthenticated();
      return;
    }
    // Redirect forbidden users back to homepage
    router.push("/");
  }, [router, redirectUnauthenticated]);

  const accessState = useMemo(() => {
    // ─── Fast-path redirection using NextAuth Session ───
    if (sessionStatus === "unauthenticated") {
      return "unauthenticated" as const;
    }

    if (sessionStatus === "authenticated" && session?.user) {
      const sessionUserType = session.user.type as "USER" | "ADMIN" | undefined;
      
      // If allowedTypes is defined and the logged-in user type is not allowed, fail immediately.
      if (allowedTypes && sessionUserType && !allowedTypes.includes(sessionUserType)) {
        return "forbidden" as const;
      }
    }

    // ─── Standard Redux-based synchronization checks ───
    // 1. Still restoring from storage? Loading.
    if (!isRestored) return "loading" as const;
    
    // 2. Not authenticated after restoration? Unauthenticated.
    if (!isAuthenticated) return "unauthenticated" as const;
    
    // 3. Authenticated but profile not yet synced? Loading.
    if (!isSynced) return "loading" as const;

    const activeUser = toAccessUser(user) || (session?.user ? { type: session.user.type as "USER" | "ADMIN" } : undefined);

    if (!activeUser) {
      return "unauthenticated" as const;
    }

    if (allowedTypes && !allowedTypes.includes(activeUser.type)) {
      return "forbidden" as const;
    }

    return "allowed" as const;
  }, [
    allowedTypes,
    isAuthenticated,
    isRestored,
    isSynced,
    user,
    session,
    sessionStatus,
  ]);

  useEffect(() => {
    if (accessState === "unauthenticated") {
      redirectUnauthenticated();
      return;
    }

    if (accessState === "forbidden") {
      redirectBasedOnUser(toAccessUser(user) || (session?.user ? { type: session.user.type as "USER" | "ADMIN" } : undefined));
      return;
    }
  }, [accessState, user, session, redirectUnauthenticated, redirectBasedOnUser]);

  if (accessState !== "allowed") {
    return (
      <FullScreenLoader
        isOpen={true}
        messages={["Verifying your permissions..."]}
      />
    );
  }

  return <>{children}</>;
}
