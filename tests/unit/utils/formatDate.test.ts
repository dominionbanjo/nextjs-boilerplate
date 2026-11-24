import { describe, it, expect } from "vitest";
import { formatPrettyDate, formatDateShort } from "@/utils/formatDate";

describe("formatDate Utility Unit Tests", () => {
  it("1. should format date short correctly", () => {
    const formatted = formatDateShort("2026-06-09");
    expect(formatted).toBe("Jun 9, 2026");
  });

  it("2. should format date pretty correctly", () => {
    const pretty = formatPrettyDate("2026-06-09T08:00:00.000Z");
    // Depending on timezone of node env, we match general pattern:
    expect(pretty).toContain("Jun");
  });

  it("3. should handle invalid dates gracefully (throws or returns Invalid Date)", () => {
    const formatted = formatDateShort("invalid-date");
    expect(formatted).toBe("Invalid Date");
  });

  it("4. should parse short formats correctly", () => {
    const formatted = formatDateShort("09/25/2025");
    expect(formatted).toBe("Sep 25, 2025");
  });

  it("5. should support custom ISO strings", () => {
    const formatted = formatDateShort("2025-12-31T12:00:00Z");
    expect(formatted).toBe("Dec 31, 2025");
  });
});
