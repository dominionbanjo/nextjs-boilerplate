import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import SignupPage from "@/modules/auth/pages/SignupPage";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock authApi RTK mutation
const mockSignupFn = vi.fn().mockReturnValue({
  unwrap: () => Promise.resolve({ success: true }),
});

vi.mock("@/modules/auth/lib/authApi", () => ({
  useSignupMutation: () => [
    mockSignupFn,
    { isLoading: false },
  ],
}));

describe("SignupPage Component Integration Tests", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    vi.clearAllMocks();
  });

  it("1. should render the signup form inputs and submit button", () => {
    render(
      <Provider store={store}>
        <SignupPage />
      </Provider>
    );

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  it("2. should trigger signup mutation when fields are filled and match", async () => {
    render(
      <Provider store={store}>
        <SignupPage />
      </Provider>
    );

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmInput, { target: { value: "password123" } });

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignupFn).toHaveBeenCalledWith({
        fullName: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
    });
  });
});
