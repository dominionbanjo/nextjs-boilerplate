import { describe, it, expect } from "vitest";
import authReducer, {
  setCredentials,
  clearAuth,
  updateUser,
  updateTokens,
  User,
  AuthTokens,
} from "@/redux/slices/authSlice";

const mockUser: User = {
  id: "user-123",
  email: "test@example.com",
  first_name: "John",
  last_name: "Doe",
  type: "USER",
  profile_picture_url: "https://avatar.png",
  is_email_verified: true,
  is_active: true,
};

const mockTokens: AuthTokens = {
  access: "access-token",
  refresh: "refresh-token",
};

describe("Auth Redux Slice Unit Tests", () => {
  it("1. should return the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isSynced: false,
      isRestored: false,
      syncError: null,
    });
  });

  it("2. should handle setCredentials", () => {
    const nextState = authReducer(
      undefined,
      setCredentials({
        user: mockUser,
        tokens: mockTokens,
      })
    );
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.tokens).toEqual(mockTokens);
    expect(nextState.isAuthenticated).toBe(true);
  });

  it("3. should handle logout", () => {
    const loggedInState = authReducer(
      undefined,
      setCredentials({
        user: mockUser,
        tokens: mockTokens,
      })
    );

    const loggedOutState = authReducer(loggedInState, clearAuth());
    expect(loggedOutState.user).toBeNull();
    expect(loggedOutState.tokens).toBeNull();
    expect(loggedOutState.isAuthenticated).toBe(false);
  });

  it("4. should handle updateUser", () => {
    const loggedInState = authReducer(
      undefined,
      setCredentials({
        user: mockUser,
        tokens: mockTokens,
      })
    );

    const nextState = authReducer(
      loggedInState,
      updateUser({ first_name: "Jane" })
    );
    expect(nextState.user?.first_name).toBe("Jane");
    expect(nextState.user?.last_name).toBe("Doe"); // Preserves other fields
  });

  it("5. should handle updateTokens", () => {
    const loggedInState = authReducer(
      undefined,
      setCredentials({
        user: mockUser,
        tokens: mockTokens,
      })
    );

    const nextState = authReducer(
      loggedInState,
      updateTokens({ access: "new-access", refresh: "new-refresh" })
    );
    expect(nextState.tokens?.access).toBe("new-access");
    expect(nextState.tokens?.refresh).toBe("new-refresh");
  });


});
