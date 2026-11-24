import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import cartReducer from "@/redux/slices/cartSlice";
import Header from "@/components/shared/layout/Header";

// Mock next/navigation
const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
  }),
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  getSession: vi.fn(),
}));

describe("Header Layout Component Integration Tests", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        cart: cartReducer,
      },
      preloadedState: {
        auth: {
          user: {
            id: "user-123",
            email: "developer@example.com",
            first_name: "John",
            last_name: "Doe",
            type: "ADMIN" as const,
            profile_picture_url: "https://example.com/avatar.png",
            is_email_verified: true,
            is_active: true,
          },
          tokens: { access: "access", refresh: "refresh" },
          isAuthenticated: true,
          isSynced: true,
          isRestored: true,
          syncError: null,
        },
      },
    });
    vi.clearAllMocks();
  });

  it("should render user profile info and name correctly in Header", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Verify user's name is rendered in the header profile area
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });

  it("should show profile dropdown and trigger logout on clicking logout button", async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Click the profile dropdown trigger
    const button = screen.getByRole("button", { name: /John Doe/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    // Find logout button and click it
    const logoutBtn = screen.getByText("Logout");
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);

    // Check that logout action cleared the state or redirected (the handleLogout function dispatches actions and pushes "/login")
    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
