"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  setCredentials,
  clearAuth,
  restoreAuth,
  setSynced,
} from "@/redux/slices/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const { isAuthenticated, tokens } = useAppSelector((state) => state.auth);

  // Sync NextAuth session -> Redux state
  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && session) {
      const currentAccessToken = tokens?.access;
      const sessionAccessToken = session.tokens?.access;

      if (!isAuthenticated || currentAccessToken !== sessionAccessToken) {
        dispatch(
          setCredentials({
            user: session.user,
            tokens: session.tokens,
          })
        );
      }
    } else if (status === "unauthenticated" && isAuthenticated) {
      dispatch(clearAuth());
    }
  }, [status, session, isAuthenticated, tokens, dispatch]);

  // Once status is not loading, we consider the initial restoration/sync complete
  useEffect(() => {
    if (status !== "loading") {
      dispatch(restoreAuth());
      if (status === "unauthenticated") {
        dispatch(setSynced(true));
      }
    }
  }, [status, dispatch]);

  return <>{children}</>;
}
