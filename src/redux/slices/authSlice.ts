import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

// ─── Simple local cookie helpers ────────────────────────────────────────────────
function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function clearAllCookies() {
  if (typeof document === "undefined") return;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    deleteCookie(name);
  }
}

export type ProfileType = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  type: ProfileType;
  profile_picture_url: string;
  is_email_verified: boolean;
  is_active: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isSynced: boolean;
  isRestored: boolean;
  syncError: string | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isSynced: false,
  isRestored: false,
  syncError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        tokens: AuthTokens;
      }>,
    ) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("tokens", JSON.stringify(action.payload.tokens));
        setCookie("user", JSON.stringify(action.payload.user), 7);
      }
      state.isSynced = false;
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      if (state.tokens) {
        state.tokens.access = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem("tokens", JSON.stringify(state.tokens));
        }
      }
    },

    updateTokens: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>,
    ) => {
      state.tokens = {
        access: action.payload.access,
        refresh: action.payload.refresh,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("tokens", JSON.stringify(state.tokens));
      }
    },

    clearAuth: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.isSynced = false;
      state.isRestored = false;
      state.syncError = null;

      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
        clearAllCookies();
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      }
    },

    syncAuth: (
      state,
      action: PayloadAction<{
        user: User;
      }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isSynced = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        setCookie("user", JSON.stringify(action.payload.user), 7);
      }
    },

    restoreAuth: (state) => {
      state.isRestored = true;
    },

    setSynced: (state, action: PayloadAction<boolean>) => {
      state.isSynced = action.payload;
    },

    setSyncError: (state, action: PayloadAction<string | null>) => {
      state.syncError = action.payload;
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  updateTokens,
  updateUser,
  syncAuth,
  clearAuth,
  restoreAuth,
  setSynced,
  setSyncError,
} = authSlice.actions;

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, dispatch }) => {
    const state = getState() as { auth: AuthState };
    const refreshToken = state.auth.tokens?.refresh;
    const accessToken = state.auth.tokens?.access;

    // Clear local auth state immediately
    dispatch(clearAuth());

    try {
      signOut({ redirect: false });
    } catch (e) {
      console.error("NextAuth signOut failed:", e);
    }

    if (refreshToken) {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }
        const rootUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "";
        if (rootUrl) {
          await fetch(`${rootUrl}/accounts/logout`, {
            method: "POST",
            headers,
            body: JSON.stringify({ refresh: refreshToken }),
          });
        }
      } catch (error) {
        console.error("Backend logout failed:", error);
      }
    }
  }
);

export default authSlice.reducer;
