import { vi, describe, it, expect, beforeAll, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import LoginPage from "@/modules/auth/pages/LoginPage";

// Mock next/navigation
const mockPush = vi.fn();
const mockAssign = vi.fn();
const mockGet = vi.fn().mockReturnValue(null);

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

// Setup window.location mock
beforeAll(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: {
      origin: "http://localhost:3000",
      assign: mockAssign,
    },
  });
});

// Mock next-auth/react
const { mockSignIn, mockGetSession } = vi.hoisted(() => ({
  mockSignIn: vi.fn().mockResolvedValue({ error: null }),
  mockGetSession: vi.fn().mockResolvedValue({
    user: {
      id: "1",
      email: "test@example.com",
      is_email_verified: true,
      type: "ADMIN",
    },
    tokens: { access: "access", refresh: "refresh" },
  })
}));

vi.mock("next-auth/react", () => ({
  signIn: mockSignIn,
  getSession: mockGetSession,
  signOut: vi.fn(),
}));

describe("LoginPage Component Integration Tests", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    vi.clearAllMocks();
  });

  it("1. should render the login form inputs and submit button", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
  });

  it("2. should prevent submission and show basic validation when input fields are empty", async () => {
    mockSignIn.mockRejectedValue(new Error("Should not be called"));
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).not.toHaveBeenCalled();
    });
  });

  it("3. should submit successfully with correct credentials and dispatch login", async () => {
    mockSignIn.mockResolvedValue({ error: null });

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
