import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<"img">) => React.createElement("img", props),
}));
