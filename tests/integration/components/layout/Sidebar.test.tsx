import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "@/components/shared/layout/Sidebar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/profile",
}));

describe("Sidebar Layout Component Integration Tests", () => {
  it("should render sidebar branding and navigation links", () => {
    render(<Sidebar />);

    expect(screen.getByText("Boilerplate")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("should highlight the active path correctly", () => {
    render(<Sidebar />);

    // Since usePathname is mocked to "/profile", User Profile link should have active styling classes
    const profileLink = screen.getByText("User Profile").closest("a");
    expect(profileLink).toHaveClass("text-blue-600");
  });
});
