import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button UI Component Integration Tests", () => {
  it("1. should render default button with children correctly", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /Click Me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("2. should apply correct variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /Delete/i });
    expect(button).toHaveClass("bg-destructive");
  });

  it("3. should apply correct size classes", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button", { name: /Small Button/i });
    expect(button).toHaveClass("h-8");
  });

  it("4. should render loading spinner and disable the button when loading", () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    // Verify the loading spinner icon is rendered (lucide Loader2 component has custom svg layout)
    const svg = button.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("animate-spin");
  });

  it("5. should handle click events successfully when not disabled", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Trigger Action</Button>);
    const button = screen.getByRole("button", { name: /Trigger Action/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
